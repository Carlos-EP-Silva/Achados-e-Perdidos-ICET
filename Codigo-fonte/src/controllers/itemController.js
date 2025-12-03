// controllers/itemController.js
const db = require('../config/db');

// 1. Função para LISTAR itens
exports.listarItens = async (req, res) => {
    try {
        // [results] pega apenas os dados retornados, ignorando metadados do banco
        const [results] = await db.query('SELECT * FROM itens ORDER BY data_registro DESC');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Função para CADASTRAR item
exports.criarItem = async (req, res) => {
    const { titulo, descricao, local_ocorrencia, data_ocorrencia, usuario_id } = req.body;
    
    const tipo = 'achado'; 
    const foto = req.file ? req.file.filename : null;

    if (!titulo || !usuario_id) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando!' });
    }

    const query = `
        INSERT INTO itens 
        (titulo, descricao, foto, local_ocorrencia, data_ocorrencia, tipo, usuario_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await db.query(query, [titulo, descricao, foto, local_ocorrencia, data_ocorrencia, tipo, usuario_id]);
        res.status(201).json({ message: 'Item cadastrado com sucesso!', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};