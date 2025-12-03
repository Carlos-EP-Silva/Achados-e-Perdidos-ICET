// controllers/adminController.js
const db = require("../config/db");

module.exports = {
  async getDashboardData(req, res) {
    try {
        const [total] = await db.query("SELECT COUNT(*) AS c FROM itens");
        const [reivindicados] = await db.query("SELECT COUNT(*) AS c FROM itens WHERE status = 'reivindicado'");
        const [pendentes] = await db.query("SELECT COUNT(*) AS c FROM reivindicacoes WHERE status = 'pendente'");
        const [guardas] = await db.query("SELECT COUNT(*) AS c FROM usuarios WHERE tipo = 'guarda' AND ativo = 1");

        const [recentes] = await db.query("SELECT titulo AS item, local_ocorrencia AS local, status FROM itens ORDER BY data_registro DESC LIMIT 5");
        
        const [reivRecentes] = await db.query(`
            SELECT i.titulo AS item, u.nome AS usuario, r.data_solicitacao AS data 
            FROM reivindicacoes r 
            JOIN itens i ON i.id = r.item_id 
            JOIN usuarios u ON u.id = r.usuario_id 
            WHERE r.status = 'pendente' 
            ORDER BY r.data_solicitacao DESC LIMIT 5
        `);

        res.json({
            totalItens: total[0].c,
            itensReivindicados: reivindicados[0].c,
            reivindPendentes: pendentes[0].c,
            guardasAtivos: guardas[0].c,
            itensRecentes: recentes,
            reivindicacoesPendentes: reivRecentes
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  },

  async listGuards(req, res) {
    try {
        // AGORA SIM: A coluna 'ativo' existe no banco
        const [rows] = await db.query("SELECT id, nome, email, ativo FROM usuarios WHERE tipo = 'guarda'");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  },

  async createGuard(req, res) {
    const { nome, email, senha } = req.body;
    try {
        // Criptografa senha do guarda também
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(senha, salt);

        await db.query("INSERT INTO usuarios (nome, email, senha, tipo, ativo) VALUES (?, ?, ?, 'guarda', 1)", [nome, email, hash]);
        res.status(201).json({ message: 'Guarda criado.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  },

  async deleteGuard(req, res) {
    const { id } = req.params;
    try {
        // Soft Delete: Apenas desativa, não apaga o histórico
        await db.query("UPDATE usuarios SET ativo = 0 WHERE id = ? AND tipo = 'guarda'", [id]);
        res.json({ message: 'Guarda desativado.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  },
  async gerarRelatorio(req, res) {
    try {
        const query = `
            SELECT 
                d.data_devolucao,
                i.titulo AS item,
                u_guarda.nome AS guarda_responsavel,
                CASE 
                    WHEN d.nome_recebedor IS NOT NULL THEN d.nome_recebedor 
                    ELSE u_recebedor.nome 
                END AS recebido_por,
                d.documento_recebedor
            FROM devolucoes d
            JOIN itens i ON d.item_id = i.id
            JOIN usuarios u_guarda ON d.guarda_id = u_guarda.id
            LEFT JOIN reivindicacoes r ON (r.item_id = i.id AND r.status = 'aprovada')
            LEFT JOIN usuarios u_recebedor ON r.usuario_id = u_recebedor.id
            ORDER BY d.data_devolucao DESC
        `;
        
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  }
};

