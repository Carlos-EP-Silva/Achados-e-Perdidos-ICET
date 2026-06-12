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

        // 4. Busca o nome do item para ficar bonito no log
        const [itemInfo] = await db.query('SELECT titulo FROM itens WHERE id = ?', [item_id]);
        const tituloItem = itemInfo[0]?.titulo || 'Item';

        // 5. SIMULAÇÃO DE ENVIO DE E-MAIL PARA A GUARITA (Contornando bloqueio do Render)
        console.log('====================================================');
        console.log(`[E-MAIL SIMULADO] Destinatário: guarda@ufam.edu.br`);
        console.log(`[E-MAIL SIMULADO] Assunto: 🚨 Nova Reivindicação`);
        console.log(`[E-MAIL SIMULADO] Alerta: O aluno reivindicou o item: "${tituloItem}".`);
        console.log(`[E-MAIL SIMULADO] Ação: Acesse o painel da Guarita para verificar.`);
        console.log('====================================================');

        // 6. Devolve a resposta final para destravar a tela do usuário
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