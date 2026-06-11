// controllers/itemController.js
const db = require('../config/db');
const nodemailer = require('nodemailer'); // ADICIONE ESTA LINHA

// Configuração do disparador de e-mail (usando as mesmas credenciais do .env)
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
exports.listarItens = async (req, res) => {
    // Pega a página atual da URL (Padrão: página 1, 6 itens por vez)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    try {
        const [results] = await db.query('SELECT * FROM itens ORDER BY data_criacao DESC LIMIT ? OFFSET ?', [limit, offset]);
        res.json(results);
    } catch (err) {
        console.error('Erro ao listar itens:', err);
        res.status(500).json({ message: 'Erro interno ao buscar os itens.' });
    }
};

// 2. Função para CADASTRAR item
exports.criarItem = async (req, res) => {
    // Agora exigimos todos os campos que marcamos como NOT NULL no banco
    const { titulo, descricao, local_ocorrencia, data_ocorrencia, usuario_id } = req.body;
    const foto = req.file ? req.file.filename : null;

    // Validação de Qualidade: Bloqueia requisições incompletas na origem
    if (!titulo || !descricao || !local_ocorrencia || !data_ocorrencia || !usuario_id) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    // Removido o campo 'tipo' (achado) pois a tabela itens agora só trata achados por padrão
    const queryInsert = `
        INSERT INTO itens (titulo, descricao, foto, local_ocorrencia, data_ocorrencia, usuario_id) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await db.query(queryInsert, [titulo, descricao, foto, local_ocorrencia, data_ocorrencia, usuario_id]);
        const novoItemId = result.insertId;

        // Diferencial de Qualidade: Gerando rastro de auditoria
        const queryLog = `INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)`;
        await db.query(queryLog, [usuario_id, 'CADASTRAR_ITEM', 'itens', `Item '${titulo}' cadastrado com sucesso. ID: ${novoItemId}`]);

        res.status(201).json({ message: 'Item cadastrado com sucesso!', id: novoItemId });
    } catch (err) {
        console.error('Erro ao cadastrar item:', err);
        res.status(500).json({ message: 'Erro interno ao salvar o item. Tente novamente mais tarde.' });
    }
};