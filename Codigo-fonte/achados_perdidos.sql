USE defaultdb;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    documento VARCHAR(20) NOT NULL UNIQUE,
    categoria VARCHAR(50) DEFAULT 'Aluno',
    tipo ENUM('usuario', 'guarda', 'admin') NOT NULL DEFAULT 'usuario',
    ativo TINYINT(1) DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    token_recuperacao VARCHAR(255) NULL,
    token_expiracao TIMESTAMP NULL
);

CREATE TABLE itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    foto VARCHAR(255),
    local_ocorrencia VARCHAR(100) NOT NULL,
    data_ocorrencia DATE NOT NULL,
    status ENUM('pendente', 'reivindicado', 'devolvido', 'arquivado') DEFAULT 'pendente',
    usuario_id INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT
);

CREATE TABLE reivindicacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM('pendente', 'aprovada', 'negada') DEFAULT 'pendente',
    usuario_id INT NOT NULL,
    item_id INT NOT NULL,
    guarda_id INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
    FOREIGN KEY (item_id) REFERENCES itens(id) ON DELETE RESTRICT,
    FOREIGN KEY (guarda_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE devolucoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL UNIQUE,
    guarda_id INT NOT NULL,
    nome_recebedor VARCHAR(100) NOT NULL,
    documento_recebedor VARCHAR(50) NOT NULL,
    contato_recebedor VARCHAR(100) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES itens(id) ON DELETE RESTRICT,
    FOREIGN KEY (guarda_id) REFERENCES usuarios(id) ON DELETE RESTRICT
);

CREATE TABLE logs_auditoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    acao VARCHAR(50) NOT NULL,
    tabela_afetada VARCHAR(50),
    descricao TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE INDEX idx_itens_status ON itens(status);
CREATE INDEX idx_itens_usuario ON itens(usuario_id);
CREATE INDEX idx_reivindicacoes_status ON reivindicacoes(status);
CREATE INDEX idx_usuarios_documento ON usuarios(documento);

INSERT INTO usuarios
(nome, email, senha, telefone, documento, categoria, tipo, ativo)
VALUES
('Admin Mestre', 'admin@ufam.edu.br', '$2b$10$jtFAromNW.wyZrx9YBldO.Bq.zL81Lxk1kwoWCUFpbNrSELKCQJ5u', 'Não informado', '00000000000', 'Servidor', 'admin', 1),
('Guarda João', 'guarda1@ufam.edu.br', '$2b$10$jtFAromNW.wyZrx9YBldO.Bq.zL81Lxk1kwoWCUFpbNrSELKCQJ5u', 'Não informado', '11111111111', 'Terceirizado', 'guarda', 1),
('Guarda Maria', 'guarda2@ufam.edu.br', '$2b$10$jtFAromNW.wyZrx9YBldO.Bq.zL81Lxk1kwoWCUFpbNrSELKCQJ5u', 'Não informado', '22222222222', 'Terceirizado', 'guarda', 1),
('Aluno Teste', 'aluno@ufam.edu.br', '$2b$10$jtFAromNW.wyZrx9YBldO.Bq.zL81Lxk1kwoWCUFpbNrSELKCQJ5u', 'Não informado', '33333333333', 'Aluno', 'usuario', 1);
