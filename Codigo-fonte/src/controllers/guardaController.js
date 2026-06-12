// controllers/guardaController.js
const db = require('../config/db');

// 1. Listar todas as reivindicações pendentes
exports.listarPendencias = async (req, res) => {
    // CORREÇÃO: Trocado r.data_solicitacao por r.data_criacao
    const query = `
        SELECT r.id, r.data_criacao as data_solicitacao, u.nome as nome_usuario, i.titulo as nome_item, i.foto, r.item_id
        FROM reivindicacoes r
        JOIN usuarios u ON r.usuario_id = u.id
        JOIN itens i ON r.item_id = i.id
        WHERE r.status = 'pendente'
    `;

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('Erro em listarPendencias:', err); // Agora o Render vai avisar se der erro
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
        // CORREÇÃO: Trocado data_registro por data_criacao
        const [rows] = await db.query('SELECT * FROM itens WHERE status IN ("pendente", "reivindicado") ORDER BY data_criacao DESC');
        res.json(rows);
    } catch (err) {
        console.error('Erro em listarItensAcervo:', err); // Agora o Render vai avisar se der erro
        res.status(500).json({ error: err.message });
    }
};
// 4. Confirmar Devolução (Dar Baixa)
exports.realizarDevolucao = async (req, res) => {
    // CORREÇÃO: A tabela devolucoes agora exige nome e contato também
    const { reivindicacao_id, item_id, guarda_id, documento_recebedor, nome_recebedor, contato_recebedor } = req.body;

    if (!documento_recebedor || !nome_recebedor || !contato_recebedor) {
        return res.status(400).json({ message: 'Dados do recebedor estão incompletos!' });
    }

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction(); // Inicia a transação segura

        // A. Registra na tabela de devoluções
        await connection.query(
            'INSERT INTO devolucoes (item_id, guarda_id, documento_recebedor, nome_recebedor, contato_recebedor) VALUES (?, ?, ?, ?, ?)', 
            [item_id, guarda_id, documento_recebedor, nome_recebedor, contato_recebedor]
        );

        // B. Atualiza status da reivindicação
        await connection.query(
            'UPDATE reivindicacoes SET status = "aprovada", guarda_id = ? WHERE id = ?', 
            [guarda_id, reivindicacao_id]
        );

        // C. Atualiza status do item
        await connection.query('UPDATE itens SET status = "devolvido" WHERE id = ?', [item_id]);

        // D. Audita a ação
        await connection.query(`INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)`, 
            [guarda_id, 'APROVAR_REIVINDICACAO', 'devolucoes', `Guarda aprovou devolução do item ID: ${item_id}`]);

        await connection.commit(); // Confirma tudo
        connection.release();

        res.json({ message: 'Devolução registrada com sucesso!' });
    } catch (err) {
        if (connection) {
            await connection.rollback(); // Desfaz tudo em caso de erro
            connection.release();
        }
        res.status(500).json({ message: 'Erro crítico ao registrar devolução.' });
    }
};