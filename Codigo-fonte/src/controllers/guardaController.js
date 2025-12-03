// controllers/guardaController.js
const db = require('../config/db');

// 1. Listar todas as reivindicações pendentes
exports.listarPendencias = async (req, res) => {
    const query = `
        SELECT r.id, r.data_solicitacao, u.nome as nome_usuario, i.titulo as nome_item, i.foto, r.item_id
        FROM reivindicacoes r
        JOIN usuarios u ON r.usuario_id = u.id
        JOIN itens i ON r.item_id = i.id
        WHERE r.status = 'pendente'
    `;

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 1. Recusar Reivindicação
exports.recusarReivindicacao = async (req, res) => {
    const { reivindicacao_id, item_id, motivo } = req.body;
    try {
        // A. Marca reivindicação como negada
        await db.query('UPDATE reivindicacoes SET status = "negada" WHERE id = ?', [reivindicacao_id]);
        
        // B. Item volta a ficar 'pendente' (disponível para outros)
        await db.query('UPDATE itens SET status = "pendente" WHERE id = ?', [item_id]);

        res.json({ message: 'Solicitação recusada. O item está disponível novamente.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Baixa Presencial (Sem login do usuário)
exports.baixaPresencial = async (req, res) => {
    // Agora recebemos também o contato_recebedor
    const { item_id, guarda_id, nome_recebedor, documento_recebedor, contato_recebedor } = req.body;

    // Validação
    if (!documento_recebedor || !nome_recebedor || !contato_recebedor) {
        return res.status(400).json({ message: 'Preencha Nome, Documento e Contato!' });
    }

    try {
        const [check] = await db.query('SELECT status FROM itens WHERE id = ?', [item_id]);
        if (check.length === 0 || check[0].status === 'devolvido') {
            return res.status(400).json({ message: 'Item não encontrado ou já devolvido!' });
        }

        // Atualizamos o INSERT para incluir o contato
        await db.query(
            'INSERT INTO devolucoes (item_id, guarda_id, documento_recebedor, nome_recebedor, contato_recebedor) VALUES (?, ?, ?, ?, ?)', 
            [item_id, guarda_id, documento_recebedor, nome_recebedor, contato_recebedor]
        );

        await db.query('UPDATE itens SET status = "devolvido" WHERE id = ?', [item_id]);
        await db.query('UPDATE reivindicacoes SET status = "negada" WHERE item_id = ? AND status = "pendente"', [item_id]);

        res.json({ message: 'Baixa presencial registrada com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro no banco de dados: ' + err.message });
    }
};

// 3. Listar Itens Disponíveis (Para o guarda selecionar na baixa presencial)
exports.listarItensAcervo = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM itens WHERE status IN ("pendente", "reivindicado") ORDER BY data_registro DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 4. Confirmar Devolução (Dar Baixa)
exports.realizarDevolucao = async (req, res) => {
    const { reivindicacao_id, item_id, guarda_id, documento_recebedor } = req.body;

    if (!documento_recebedor) {
        return res.status(400).json({ message: 'O documento do recebedor é obrigatório!' });
    }

    try {
        // A. Registra na tabela de devoluções
        await db.query(
            'INSERT INTO devolucoes (item_id, guarda_id, documento_recebedor) VALUES (?, ?, ?)', 
            [item_id, guarda_id, documento_recebedor]
        );

        // B. Atualiza status da reivindicação
        await db.query(
            'UPDATE reivindicacoes SET status = "aprovada", guarda_id = ? WHERE id = ?', 
            [guarda_id, reivindicacao_id]
        );

        // C. Atualiza status do item
        await db.query('UPDATE itens SET status = "devolvido" WHERE id = ?', [item_id]);

        res.json({ message: 'Devolução registrada com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao registrar devolução: ' + err.message });
    }
};