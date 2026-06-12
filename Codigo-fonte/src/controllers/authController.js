// controllers/authController.js
const db = require('../config/db');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Nativo do Node.js
const SECRET_KEY = process.env.JWT_SECRET || 'chave_super_secreta_da_ufam';

// Configuração do disparador de e-mail (Forçando SSL e contornando bloqueios IPv6)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true obriga a usar a porta 465 (SSL)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Evita que o Render bloqueie o certificado do Google
    }
});
module.exports = {

    // =========================================================
    // 1. LOGIN (Entrar no sistema)
    // =========================================================
    async login(req, res) {
        const { email, senha } = req.body;
        console.log('--- Tentativa de Login ---');
        console.log('Email:', email);

        if (!email || !senha) {
            return res.status(400).json({ message: 'Por favor, informe email e senha!' });
        }

        try {
            // Busca usuário pelo email
            const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

            // Se não achar o email
            if (users.length === 0) {
                return res.status(401).json({ message: 'Email ou senha incorretos' });
            }

            const usuario = users[0];

            // Verifica se o usuário foi desativado pelo Admin
            if (usuario.ativo === 0) {
                return res.status(401).json({ message: 'Acesso negado. Usuário inativo.' });
            }

            // Compara a senha digitada com a criptografada no banco
            const senhaBate = await bcrypt.compare(senha, usuario.senha);

            if (!senhaBate) {
                return res.status(401).json({ message: 'Email ou senha incorretos' });
            }

            // Se tudo der certo, cria o Token
            const token = jwt.sign(
                { 
                    id: usuario.id, 
                    tipo: usuario.tipo, 
                    nome: usuario.nome 
                },
                SECRET_KEY,
                { expiresIn: '8h' } // Token vale por 8 horas
            );

            console.log('Login Sucesso:', usuario.nome);

            res.json({
                message: 'Login realizado com sucesso!',
                token: token,
                user: {
                    id: usuario.id,
                    nome: usuario.nome,
                    tipo: usuario.tipo,
                    categoria: usuario.categoria // Retorna a categoria para o front saber
                }
            });

        } catch (err) {
            console.error('Erro no Login:', err);
            res.status(500).json({ error: err.message });
        }
    },

    // =========================================================
    // 2. REGISTER (Criar Conta)
    // =========================================================
    async register(req, res) {
        // Agora o back-end extrai todos os campos enviados pelo Vercel
        const { nome, email, senha, documento, categoria, telefone } = req.body;

        // Validação de segurança: Impede que o MySQL exploda se faltar algo
        if (!nome || !email || !senha || !documento || !telefone) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        try {
            // Verifica se o email ou documento já existem no banco
            const [users] = await db.query('SELECT * FROM usuarios WHERE email = ? OR documento = ?', [email, documento]);
            if (users.length > 0) {
                return res.status(400).json({ message: 'Este E-mail ou Documento já está cadastrado no sistema.' });
            }

            // Criptografa a senha antes de salvar
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(senha, salt);

            // Insere todos os dados corretamente na tabela
            await db.query(
                'INSERT INTO usuarios (nome, email, senha, telefone, documento, categoria) VALUES (?, ?, ?, ?, ?, ?)',
                [nome, email, hashSenha, telefone, documento, categoria || 'Aluno']
            );

            res.status(201).json({ message: 'Conta criada com sucesso!' });

        } catch (err) {
            console.error('Erro profundo no cadastro:', err);
            res.status(500).json({ message: 'Erro interno ao tentar salvar no banco de dados.' });
        }
    }, 

    async recuperarSenha(req, res) {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'E-mail obrigatório.' });

        try {
            // Verifica no banco se o e-mail realmente existe
            const [rows] = await db.query('SELECT id, nome FROM usuarios WHERE email = ?', [email]);
            
            if (rows.length === 0) {
                // Por segurança, não dizemos ao invasor que o e-mail não existe, damos uma mensagem genérica
                return res.json({ message: 'Se o e-mail existir na nossa base, você receberá um link em breve.' });
            }

            // SIMULAÇÃO: Aqui você usaria o Nodemailer para enviar um e-mail real.
            // Para o projeto, vamos gravar um log e retornar sucesso.
            await db.query(`INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)`, 
                [rows[0].id, 'RECUPERAR_SENHA', 'usuarios', `Usuário solicitou link de recuperação.`]);

            res.json({ message: 'Se o e-mail existir na nossa base, você receberá um link em breve. (Verifique o console do servidor para fins de teste).' });
            console.log(`[SIMULAÇÃO DE EMAIL] Link de recuperação enviado para: ${email}`);

        } catch (err) {
            res.status(500).json({ message: 'Erro no servidor.' });
        }
    },

    // =========================================================
    // 3. GET PROFILE (Ler dados do usuário logado)
    // =========================================================
    async getProfile(req, res) {
        // req.user vem do middleware (roleMiddleware.js)
        // Se der erro aqui, é porque o middleware não está na rota
        if (!req.user) {
            return res.status(401).json({ message: 'Token não processado.' });
        }

        try {
            const [rows] = await db.query(
                'SELECT id, nome, email, telefone, documento, categoria, tipo FROM usuarios WHERE id = ?', 
                [req.user.id]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // =========================================================
    // 4. UPDATE PROFILE (Atualizar dados)
    // =========================================================
    async updateProfile(req, res) {
        console.log('--- Atualizando Perfil ---');

        // AQUI ESTAVA O ERRO ANTES:
        // Precisamos garantir que pegamos o ID do token seguro (req.user.id)
        if (!req.user || !req.user.id) {
            console.log('Erro: req.user.id indefinido.');
            return res.status(401).json({ message: 'Sessão inválida. Faça login novamente.' });
        }

        const id = req.user.id;
        const { telefone, documento, categoria } = req.body;

        try {
            await db.query(
                'UPDATE usuarios SET telefone = ?, documento = ?, categoria = ? WHERE id = ?', 
                [telefone, documento, categoria, id]
            );

            console.log('Perfil atualizado para ID:', id);
            res.json({ message: 'Perfil atualizado com sucesso!' });
        } catch (err) {
            console.error('Erro Update:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async recuperarSenha(req, res) {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'E-mail obrigatório.' });

        try {
            const [users] = await db.query('SELECT id, nome FROM usuarios WHERE email = ?', [email]);
            if (users.length === 0) {
                return res.status(404).json({ message: 'E-mail não encontrado no sistema.' });
            }

            const usuario = users[0];

            // Gera um token aleatório e rápido para simulação
            const token = crypto.randomBytes(10).toString('hex');
            
            // Define a expiração para daqui a 15 minutos
            const expiracao = new Date(Date.now() + 15 * 60 * 1000); 

            // Salva o token e a expiração no registro do usuário
            await db.query(
                'UPDATE usuarios SET token_recuperacao = ?, token_expiracao = ? WHERE id = ?',
                [token, expiracao, usuario.id]
            );

            // Log de auditoria
            await db.query('INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)', 
                [usuario.id, 'SOLICITOU_RECUPERACAO', 'usuarios', `Simulação de recuperação ativada para ${email}`]);

            // DEVOLVEMOS O TOKEN PARA O FRONTEND PARA SIMULAR O CLIQUE NO E-MAIL
            res.json({ 
                message: 'Um link de recuperação fictício foi gerado! Redirecionando para simulação...',
                simulatedToken: token 
            });

        } catch (err) {
            console.error('Erro na recuperação:', err);
            res.status(500).json({ message: 'Erro ao tentar iniciar a recuperação de senha.' });
        }
    },

    // 2. REDEFINIR A SENHA (Usa o token para salvar a nova senha)
    async redefinirSenha(req, res) {
        const { token, novaSenha } = req.body;

        if (!token || !novaSenha) {
            return res.status(400).json({ message: 'Token e nova senha são obrigatórios.' });
        }

        try {
            // Busca o usuário que possui aquele token e verifica se ainda está dentro do prazo de validade
            const [users] = await db.query(
                'SELECT id FROM usuarios WHERE token_recuperacao = ? AND token_expiracao > NOW()',
                [token]
            );

            if (users.length === 0) {
                return res.status(400).json({ message: 'Token inválido ou expirado. Solicite a recuperação novamente.' });
            }

            const usuarioId = users[0].id;

            // Criptografa a nova senha escolhida
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(novaSenha, salt);

            // Atualiza a senha e limpa os campos de token para que ele não possa ser usado de novo
            await db.query(
                'UPDATE usuarios SET senha = ?, token_recuperacao = NULL, token_expiracao = NULL WHERE id = ?',
                [hashSenha, usuarioId]
            );

            // Log de auditoria
            await db.query('INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)', 
                [usuarioId, 'ALTEROU_SENHA_TOKEN', 'usuarios', `Senha redefinida com sucesso via token.`]);

            res.json({ message: 'Sua senha foi atualizada com sucesso! Você já pode fazer login.' });

        } catch (err) {
            console.error('Erro ao redefinir senha:', err);
            res.status(500).json({ message: 'Erro interno ao atualizar a senha.' });
        }
    }
};
