// controllers/reivindicacaoController.js
const db = require('../config/db');

exports.reivindicarItem = async (req, res) => {
    const { item_id, usuario_id } = req.body;

    if (!item_id || !usuario_id) {
        return res.status(400).json({ message: 'ID do item e ID do usuário são obrigatórios.' });
    }

    let connection;
    try {
        // Diferencial de Qualidade: Inicia uma Transação no banco
        connection = await db.getConnection();
        await connection.beginTransaction();

        // 1. Cria a reivindicação
        const queryInsert = 'INSERT INTO reivindicacoes (item_id, usuario_id, status) VALUES (?, ?, "pendente")';
        await connection.query(queryInsert, [item_id, usuario_id]);

        // 2. Atualiza o status do item
        const queryUpdate = 'UPDATE itens SET status = "reivindicado" WHERE id = ?';
        await connection.query(queryUpdate, [item_id]);

        // 3. Log de auditoria
        const queryLog = `INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)`;
        await connection.query(queryLog, [usuario_id, 'CRIAR_REIVINDICACAO', 'reivindicacoes', `Usuário solicitou reivindicação do item ID: ${item_id}`]);

        // Se tudo deu certo até aqui, confirma a transação no banco (Commit)
        await connection.commit();
        connection.release();

        res.json({ message: 'Reivindicação enviada! Aguarde a aprovação da administração.' });
    } catch (err) {
        // Se qualquer query falhar, desfaz tudo para manter a integridade (Rollback)
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        console.error('Erro na reivindicação:', err);
        res.status(500).json({ message: 'Erro interno ao processar a reivindicação.' });
    }
};