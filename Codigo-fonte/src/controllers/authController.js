// controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'chave_super_secreta_da_ufam';

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
        const { nome, email, senha, categoria, documento } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatórios!' });
        }

        try {
            // Verifica se o email já existe
            const [rows] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
            if (rows.length > 0) {
                return res.status(400).json({ message: 'Este email já está em uso.' });
            }

            // Criptografa a senha
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(senha, salt);

            // Cria o usuário (Padrão: Ativo=1, Tipo=Usuario)
            await db.query(
                'INSERT INTO usuarios (nome, email, senha, categoria, documento, tipo, ativo) VALUES (?, ?, ?, ?, ?, "usuario", 1)',
                [nome, email, hashSenha, categoria || 'Aluno', documento || '']
            );

            res.status(201).json({ message: 'Cadastro realizado com sucesso! Faça login.' });

        } catch (err) {
            console.error('Erro no Cadastro:', err);
            res.status(500).json({ error: err.message });
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
    }
};