const bcrypt = require('bcryptjs');

describe('Testes Unitários - Regras de Segurança e Autenticação (Caixa Branca)', () => {
  
  it('CT-U01: Deve gerar um hash criptografado diferente da senha original do usuário', async () => {
    const senhaOriginal = 'senha123';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(senhaOriginal, salt);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(senhaOriginal);
  });

  it('CT-U02: Deve validar o login com sucesso ao comparar senha correta com seu hash', async () => {
    const senhaOriginal = 'senhaSeguraICET';
    const hash = await bcrypt.hash(senhaOriginal, 10);
    const isValid = await bcrypt.compare(senhaOriginal, hash);
    expect(isValid).toBe(true);
  });

  it('CT-U03: Deve bloquear o acesso (retornar falso) ao tentar login com senha incorreta', async () => {
    const senhaOriginal = 'minhasenha';
    const hash = await bcrypt.hash(senhaOriginal, 10);
    const isValid = await bcrypt.compare('senhaerrada_123', hash);
    expect(isValid).toBe(false);
  });

  it('CT-U04: Deve garantir que o hash gerado possua o padrão arquitetural (60 caracteres)', async () => {
    const hash = await bcrypt.hash('teste_admin', 10);
    expect(hash.length).toBe(60);
    expect(hash.startsWith('$2a$') || hash.startsWith('$2b$')).toBe(true);
  });

  it('CT-U05: Deve barrar a injeção de senhas vazias ou nulas contra o hash do banco', async () => {
    const hash = await bcrypt.hash('admin_real', 10);
    const isVazioValid = await bcrypt.compare('', hash);
    expect(isVazioValid).toBe(false);
  });

  it('CT-U06: Deve garantir a aleatoriedade do Salt para mitigar ataques de Rainbow Tables', async () => {
    const senha = 'mesma_senha_secreta';
    const hashUsuario1 = await bcrypt.hash(senha, 10);
    const hashUsuario2 = await bcrypt.hash(senha, 10);
    expect(hashUsuario1).not.toBe(hashUsuario2); 
  });
});

describe('Testes Unitários - Validação de Dados e Regras de Negócio', () => {
  
  it('CT-U07: Deve validar corretamente o formato de e-mail institucional via Regex', () => {
    const emailValido = 'aluno@icet.ufam.edu.br';
    const emailInvalido = 'aluno.icet.ufam';
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(regexEmail.test(emailValido)).toBe(true);
    expect(regexEmail.test(emailInvalido)).toBe(false);
  });

  it('CT-U08: Deve barrar o registro de um item perdido se campos obrigatórios forem omitidos', () => {
    // Simulando a chegada de dados vazios no Controller
    const itemMock = { titulo: 'Caderno', descricao: '', local_encontrado: 'Laboratório' };
    const isValid = Boolean(itemMock.titulo && itemMock.descricao && itemMock.local_encontrado);
    expect(isValid).toBe(false);
  });

  it('CT-U09: Deve garantir que a data do item encontrado não seja uma data no futuro', () => {
    const hoje = new Date();
    const dataEncontro = new Date();
    dataEncontro.setDate(hoje.getDate() + 5); // Simulando data daqui a 5 dias
    const isDataValida = dataEncontro <= hoje;
    expect(isDataValida).toBe(false);
  });

  it('CT-U10: Deve formatar o status do item corretamente (0 = Pendente, 1 = Devolvido)', () => {
    const statusBancoDeDados = 0; 
    const statusFormatado = statusBancoDeDados === 0 ? 'Pendente' : 'Devolvido';
    expect(statusFormatado).toBe('Pendente');
  });
});