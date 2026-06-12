// controllers/adminController.js
const db = require("../config/db");
const bcrypt = require('bcryptjs');

module.exports = {
  async getDashboardData(req, res) {
    try {
      const [total] = await db.query("SELECT COUNT(*) AS c FROM itens");
      const [reivindicados] = await db.query("SELECT COUNT(*) AS c FROM itens WHERE status = 'reivindicado'");
      const [pendentes] = await db.query("SELECT COUNT(*) AS c FROM reivindicacoes WHERE status = 'pendente'");
      const [guardas] = await db.query("SELECT COUNT(*) AS c FROM usuarios WHERE tipo = 'guarda' AND ativo = 1");
      const [recentes] = await db.query("SELECT id, titulo AS item, local_ocorrencia AS local, status FROM itens ORDER BY data_criacao DESC LIMIT 5");   
      
      // CORREÇÃO: Alterado r.data_solicitacao para r.data_criacao
      const [reivRecentes] = await db.query(`
          SELECT i.titulo AS item, u.nome AS usuario, r.data_criacao AS data 
          FROM reivindicacoes r 
          JOIN itens i ON i.id = r.item_id 
          JOIN usuarios u ON u.id = r.usuario_id 
          WHERE r.status = 'pendente' 
          ORDER BY r.data_criacao DESC LIMIT 5
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
        console.error('Erro no getDashboardData:', err); // Exibe o erro real no Render
        res.status(500).json({ message: 'Erro ao carregar dashboard.' });
    }
  },

  async listGuards(req, res) {
    try {
        const [rows] = await db.query("SELECT id, nome, email, ativo FROM usuarios WHERE tipo = 'guarda'");
        res.json(rows);
    } catch (err) {
        console.error('Erro no listGuards:', err);
        res.status(500).json({ error: err.message });
    }
  },

  async createGuard(req, res) {
    const { nome, email, senha, telefone, documento } = req.body;
    
    // Simplificado para alinhar com o que o frontend envia de forma básica, ou garanta que o form envie todos
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(senha, salt);

        // Ajustado para permitir campos nulos caso telefone/documento não venham do front temporariamente
        const [result] = await db.query(
            "INSERT INTO usuarios (nome, email, senha, telefone, documento, tipo, ativo, categoria) VALUES (?, ?, ?, ?, ?, 'guarda', 1, 'Terceirizado')", 
            [nome, email, hash, telefone || null, documento || null]
        );

        await db.query(`INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)`, 
            [req.user.id, 'CRIAR_GUARDA', 'usuarios', `Admin criou o guarda ${nome}`]);

        res.status(201).json({ message: 'Guarda criado com sucesso.' });
    } catch (err) {
        console.error('Erro no createGuard:', err);
        res.status(500).json({ message: 'Erro ao criar guarda.' });
    }
  },

  async deleteGuard(req, res) {
    const { id } = req.params;
    try {
        await db.query("UPDATE usuarios SET ativo = 0 WHERE id = ? AND tipo = 'guarda'", [id]);
        
        await db.query(`INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)`, 
            [req.user.id, 'DESATIVAR_GUARDA', 'usuarios', `Admin desativou o guarda ID: ${id}`]);

        res.json({ message: 'Guarda desativado.' });
    } catch (err) {
        console.error('Erro no deleteGuard:', err);
        res.status(500).json({ message: 'Erro ao desativar guarda.' });
    }
  },

  async reativarGuarda(req, res) {
    const { id } = req.params;
    try {
        await db.query("UPDATE usuarios SET ativo = 1 WHERE id = ? AND tipo = 'guarda'", [id]);
        
        await db.query(`INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)`, 
            [req.user.id, 'REATIVAR_GUARDA', 'usuarios', `Admin reativou o guarda ID: ${id}`]);

        res.json({ message: 'Guarda reativado com sucesso.' });
    } catch (err) {
        console.error('Erro no reativarGuarda:', err);
        res.status(500).json({ message: 'Erro ao reativar guarda.' });
    }
  },

  // Excluir permanentemente (Arquivar)
  async excluirGuarda(req, res) {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM usuarios WHERE id = ? AND tipo = 'guarda'", [id]);
        
        await db.query(`INSERT INTO logs_auditoria (usuario_id, acao, tabela_afetada, descricao) VALUES (?, ?, ?, ?)`, 
            [req.user.id, 'EXCLUIR_GUARDA', 'usuarios', `Admin excluiu o guarda ID: ${id}`]);

        res.json({ message: 'Guarda excluído permanentemente.' });
    } catch (err) {
        console.error('Erro no excluirGuarda:', err);
        // Se o banco bloquear por causa de chaves estrangeiras (histórico), devolvemos um erro amigável:
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ message: 'Este guarda já possui histórico de itens devolvidos. Mantenha-o desativado para preservar o relatório.' });
        }
        res.status(500).json({ message: 'Erro ao excluir guarda.' });
    }
  },
  async gerarRelatorio(req, res) {
    try {
        // CORREÇÃO: Alterado d.data_devolucao para d.data_criacao
        const query = `
            SELECT 
                d.data_criacao AS data_devolucao,
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
            ORDER BY d.data_criacao DESC
        `;
        
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Erro no gerarRelatorio:', err);
        res.status(500).json({ error: err.message });
    }
  }
};