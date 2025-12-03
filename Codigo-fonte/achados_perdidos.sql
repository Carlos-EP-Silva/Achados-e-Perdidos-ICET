--acahdos_perdidos.sql
-- 1. ZERAR TUDO E RECRIAR O BANCO
DROP DATABASE IF EXISTS achados_perdidos;
CREATE DATABASE achados_perdidos;
USE achados_perdidos;

-- 2. TABELA DE USUÁRIOS
-- Atualizada com 'documento' (RG/CPF) e 'categoria' (Aluno/Professor/etc)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL, 
    telefone VARCHAR(20),
    documento VARCHAR(20), -- Substitui a antiga 'matricula'
    categoria VARCHAR(30) DEFAULT 'Aluno', -- Ex: Professor, Servidor, Terceirizado
    tipo ENUM('usuario', 'guarda', 'admin') NOT NULL DEFAULT 'usuario',
    ativo TINYINT(1) DEFAULT 1, -- 1 = Ativo, 0 = Bloqueado
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABELA DE ITENS
CREATE TABLE itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    foto VARCHAR(255), 
    local_ocorrencia VARCHAR(100) NOT NULL,
    data_ocorrencia DATE, 
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo ENUM('achado') NOT NULL DEFAULT 'achado', 
    status ENUM('pendente', 'reivindicado', 'devolvido', 'arquivado') DEFAULT 'pendente',
    usuario_id INT NOT NULL, -- Quem cadastrou (geralmente o guarda)
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 4. TABELA DE REIVINDICAÇÕES (Pedidos online)
CREATE TABLE reivindicacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'aprovada', 'negada') DEFAULT 'pendente',
    usuario_id INT NOT NULL, -- O aluno que diz ser dono
    item_id INT NOT NULL,    -- O item
    guarda_id INT,           -- O guarda que analisou
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (item_id) REFERENCES itens(id),
    FOREIGN KEY (guarda_id) REFERENCES usuarios(id)
);

-- 5. TABELA DE DEVOLUÇÕES (Histórico final)
-- Atualizada para aceitar BAIXA PRESENCIAL (sem id de usuário)
CREATE TABLE devolucoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_devolucao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    item_id INT NOT NULL UNIQUE, 
    guarda_id INT NOT NULL,
    
    -- Dados de quem recebeu
    nome_recebedor VARCHAR(100),       -- Nome da pessoa (Novo)
    documento_recebedor VARCHAR(50),   -- RG ou CPF
    contato_recebedor VARCHAR(100),    -- Email ou Telefone (Novo)

    FOREIGN KEY (item_id) REFERENCES itens(id),
    FOREIGN KEY (guarda_id) REFERENCES usuarios(id)
);

-- ==============================================================
-- INSERINDO DADOS DE TESTE
-- ==============================================================

-- 1. USUÁRIOS (Senha padrão para todos: 123456)
INSERT INTO usuarios (nome, email, senha, tipo, ativo, documento, categoria) VALUES 
('Administrador Chefe', 'admin@ufam.edu.br', '$2b$10$3a0Lca4fxVcyv6SgbceTZ.5OE02oszdZAjZONOfxlApQDtaAZAe5i', 'admin', 1, '0001', 'Servidor'),
('Guarda João', 'guarda@ufam.edu.br', '$2b$10$3a0Lca4fxVcyv6SgbceTZ.5OE02oszdZAjZONOfxlApQDtaAZAe5i', 'guarda', 1, '0002', 'Terceirizado'),
('Aluno Carlos', 'aluno@ufam.edu.br', '$2b$10$3a0Lca4fxVcyv6SgbceTZ.5OE02oszdZAjZONOfxlApQDtaAZAe5i', 'usuario', 1, '12345678', 'Aluno');

-- 2. ITENS (ACERVO)
-- Note que estamos usando usuario_id = 2 (Guarda João) como quem cadastrou
INSERT INTO itens (titulo, descricao, local_ocorrencia, data_ocorrencia, status, usuario_id, foto) VALUES 
('Notebook Dell Inspiron', 'Notebook cinza com adesivo do curso de Engenharia. Esquecido na mesa.', 'Biblioteca Setorial', CURDATE(), 'pendente', 2, NULL),
('Chave de Carro (Fiat)', 'Chave canivete com chaveiro do Flamengo.', 'Estacionamento Bloco B', CURDATE(), 'pendente', 2, NULL),
('Garrafa Térmica Azul', 'Garrafa marca Pacco, cor azul marinho, levemente amassada.', 'Cantina do ICET', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'pendente', 2, NULL),
('Óculos RayBan', 'Armação preta quadrada, dentro de estojo marrom.', 'Lab Informática 03', DATE_SUB(CURDATE(), INTERVAL 2 DAY), 'pendente', 2, NULL),
('Caderno de Cálculo', 'Caderno capa dura Tilibra, nome Ana na capa.', 'Sala 104 - Bloco A', DATE_SUB(CURDATE(), INTERVAL 3 DAY), 'pendente', 2, NULL),
('Case de Fone JBL', 'Apenas a caixa de carregamento branca (sem os fones).', 'Banco do pátio', CURDATE(), 'pendente', 2, NULL),
('Casaco Moletom', 'Casaco preto tamanho G, sem estampa.', 'Auditório Principal', DATE_SUB(CURDATE(), INTERVAL 5 DAY), 'pendente', 2, NULL);

-- Confirmação
SELECT * FROM usuarios;
SELECT * FROM itens;