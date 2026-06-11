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

    try {
    // Busca o nome do item para ficar bonito no e-mail
    const [itemInfo] = await db.query('SELECT titulo FROM itens WHERE id = ?', [item_id]);
    const tituloItem = itemInfo[0]?.titulo || 'Item';

    // Dispara o e-mail de notificação para a guarita (ou admin)
    await transporter.sendMail({
        from: `"Achados e Perdidos ICET" <${process.env.EMAIL_USER}>`,
        to: 'guarda@ufam.edu.br', // Aqui você pode colocar o e-mail real da guarita/administração
        subject: '🚨 Nova Reivindicação de Item no Sistema',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                <h2 style="color: #008542;">Nova Reivindicação Recebida</h2>
                <p>Um aluno acaba de reivindicar o item: <strong>${tituloItem}</strong>.</p>
                <p>Por favor, aceda ao painel do sistema para verificar a solicitação e aguardar o comparecimento do aluno na guarita.</p>
                <br>
                <p>Sistema de Achados e Perdidos - ICET/UFAM</p>
            </div>
        `
    });
    console.log('E-mail de reivindicação enviado com sucesso.');
} catch (emailErr) {
    // Se o e-mail falhar, não impede a reivindicação de ser salva
    console.error('Erro ao enviar e-mail de notificação:', emailErr);
}
};