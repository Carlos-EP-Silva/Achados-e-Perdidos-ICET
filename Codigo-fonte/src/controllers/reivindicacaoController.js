// controllers/reivindicacaoController.js
const db = require('../config/db');

exports.reivindicarItem = async (req, res) => {
    const { item_id, usuario_id } = req.body;

    if (!item_id || !usuario_id) {
        return res.status(400).json({ message: 'Dados faltando.' });
    }

    try {
        // 1. Cria a reivindicação
        const queryInsert = 'INSERT INTO reivindicacoes (item_id, usuario_id, status) VALUES (?, ?, "pendente")';
        await db.query(queryInsert, [item_id, usuario_id]);

        // 2. Atualiza o status do item
        const queryUpdate = 'UPDATE itens SET status = "reivindicado" WHERE id = ?';
        await db.query(queryUpdate, [item_id]);

        res.json({ message: 'Reivindicação enviada! Aguarde a aprovação do guarda.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};