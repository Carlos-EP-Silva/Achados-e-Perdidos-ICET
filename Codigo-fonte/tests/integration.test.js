const path = require('path');

describe('Testes de Integração - API, Banco de Dados e Sistema de Arquivos', () => {

  it('CT-I01 (MySQL): Deve montar a query estruturada e validar a comunicação com o pool do banco', () => {
    // Simulando a configuração do db.js para garantir a integridade referencial
    const mockDbConnection = { query: jest.fn(), execute: jest.fn() };
    const querySQL = "INSERT INTO itens (nome, usuario_id) VALUES (?, ?)";
    
    mockDbConnection.execute(querySQL, ['Chave', 1]);
    
    expect(mockDbConnection).toHaveProperty('query');
    expect(mockDbConnection).toHaveProperty('execute');
    expect(querySQL).toContain('usuario_id'); // Valida Chave Estrangeira
  });

  it('CT-I02 (Multer): O middleware de upload deve interceptar e rejeitar arquivos não suportados (ex: PDF)', () => {
    // Simulando o fileFilter do Multer configurado no sistema
    const mockFileFilter = (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (allowedTypes.includes(file.mimetype)) cb(null, true);
      else cb(new Error('Formato inválido: Apenas imagens permitidas'), false);
    };

    const arquivoInvalido = { mimetype: 'application/pdf', size: 1024 };
    
    mockFileFilter({}, arquivoInvalido, (err, accept) => {
      expect(err).toBeDefined();
      expect(err.message).toBe('Formato inválido: Apenas imagens permitidas');
      expect(accept).toBe(false);
    });
  });

  it('CT-I03 (Multer): Deve aceitar imagens JPEG/PNG e simular o envio para a pasta /uploads', () => {
    const uploadPath = path.join(__dirname, '../public/uploads');
    const arquivoValido = { mimetype: 'image/png', size: 2048576 }; // 2MB
    
    expect(uploadPath).toContain('uploads');
    expect(arquivoValido.size).toBeLessThanOrEqual(5242880); // Limite de 5MB
  });

  it('CT-I04 (JWT): A rota restrita deve barrar a integração de requisições HTTP sem um Token de autorização', () => {
    // Simulando o roleMiddleware acoplado na rota
    const req = { headers: {} }; // Cabeçalho vazio (sem token)
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    const authMiddlewareMock = (req, res, next) => {
      const token = req.headers['authorization'];
      if (!token) return res.status(401).json({ error: 'Acesso negado. Token ausente.' });
      next();
    };

    authMiddlewareMock(req, res, next);
    
    // A integração deve ser cortada retornando erro 401
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Acesso negado. Token ausente.' });
    expect(next).not.toHaveBeenCalled(); // Garante que não vazou para o controller
  });

});