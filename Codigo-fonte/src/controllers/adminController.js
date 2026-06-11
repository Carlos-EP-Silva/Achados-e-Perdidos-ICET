// controllers/adminController.js
const db = require("../config/db");
const bcrypt = require('bcryptjs'); // Faltava importar o bcrypt aqui no seu código original

module.exports = {
  async getDashboardData(req, res) {
    try {
        const [total] = await db.query("SELECT COUNT(*) AS c FROM itens");
        const [reivindicados] = await db.query("SELECT COUNT(*) AS c FROM itens WHERE status = 'reivindicado'");
        const [pendentes] = await db.query("SELECT COUNT(*) AS c FROM reivindicacoes WHERE status = 'pendente'");
        const [guardas] = await db.query("SELECT COUNT(*) AS c FROM usuarios WHERE tipo = 'guarda' AND ativo = 1");
        const [recentes] = await db.query("SELECT id, titulo AS item, local_ocorrencia AS local, status FROM itens ORDER BY data_criacao DESC LIMIT 5");   
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
        res.status(500).json({ message: 'Erro ao carregar dashboard.' });
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
    // CORREÇÃO: Adicionados campos obrigatórios
    const { nome, email, senha, telefone, documento } = req.body;
    
    if (!nome || !email || !senha || !telefone || !documento) {
        return res.status(400).json({ message: 'Todos os dados do guarda são obrigatórios.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(senha, salt);

        const [result] = await db.query(
            "INSERT INTO usuarios (nome, email, senha, telefone, documento, tipo, ativo, categoria) VALUES (?, ?, ?, ?, ?, 'guarda', 1, 'Terceirizado')", 
            [nome, email, hash, telefone, documento]
        );

        // Qualidade: Log de auditoria gerado pelo Admin
        await db.query(`INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)`, 
            [req.user.id, 'CRIAR_GUARDA', 'usuarios', `Admin criou o guarda ${nome}`]);

        res.status(201).json({ message: 'Guarda criado com sucesso.' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar guarda.' });
    }
  },

  async deleteGuard(req, res) {
    const { id } = req.params;
    try {
        await db.query("UPDATE usuarios SET ativo = 0 WHERE id = ? AND tipo = 'guarda'", [id]);
        
        // Qualidade: Log de auditoria de desativação
        await db.query(`INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)`, 
            [req.user.id, 'DESATIVAR_GUARDA', 'usuarios', `Admin desativou o guarda ID: ${id}`]);

        res.json({ message: 'Guarda desativado.' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao desativar guarda.' });
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

