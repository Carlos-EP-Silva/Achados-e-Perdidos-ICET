# SISTEMA ACHADOS E PERDIDOS - ICET/UFAM

**INTEGRANTES:**
* [cite_start]Carlos Eduardo [cite: 3]
* [cite_start]Cintia Seixas [cite: 4]

[cite_start]**DISCIPLINA:** Desenvolvimento Web [cite: 5]
[cite_start]**PROFESSOR:** Antônio Alberto [cite: 6]
[cite_start]**DATA DE ENTREGA:** 03/12/2025 [cite: 7]

---

## SUMÁRIO
1. [cite_start]Introdução [cite: 9]
2. [cite_start]Metodologia Utilizada [cite: 10]
3. [cite_start]Registro das Entrevistas com o Cliente [cite: 11]
4. [cite_start]Registro do Tempo Investido [cite: 12]
5. [cite_start]Levantamento de Requisitos [cite: 13]
6. [cite_start]Diagramas UML [cite: 14]
7. [cite_start]Protótipos de Telas [cite: 15]
8. [cite_start]Descrição da Arquitetura e Tecnologias [cite: 16]
9. [cite_start]Módulos Desenvolvidos [cite: 17]
10. [cite_start]Testes Realizados [cite: 18]
11. [cite_start]Conclusão e Reflexões [cite: 19]
12. [cite_start]Anexos [cite: 20]

---

## 1. INTRODUÇÃO

### 1.1 Apresentação do Sistema
[cite_start]O Sistema "Achados e Perdidos - ICET/UFAM" é uma aplicação web desenvolvida para modernizar o processo de gestão de objetos perdidos e encontrados no Instituto de Ciências Exatas e Tecnologia da UFAM[cite: 23].

### 1.2 Justificativa da Escolha
[cite_start]A escolha baseou-se na necessidade real de substituir o sistema manual atual (cadernos de registro) por uma solução digital que ofereça maior eficiência, transparência e acessibilidade[cite: 25].

### 1.3 Objetivo Geral
[cite_start]Desenvolver uma aplicação web completa para gestão de achados e perdidos no ICET/UFAM, integrada a banco de dados MySQL e com interface responsiva[cite: 27].

### 1.4 Objetivos Específicos
* [cite_start]Implementar sistema de autenticação com três níveis de acesso[cite: 29].
* [cite_start]Desenvolver módulo de cadastro e gestão de itens[cite: 30].
* [cite_start]Criar fluxo completo de reivindicação e devolução[cite: 31].

### 1.5 Escopo Definido
**Módulos Implementados:**
* [cite_start]Módulo de Segurança (autenticação e autorização)[cite: 34].
* [cite_start]Módulo de Transação (processo de reivindicação e devolução)[cite: 35].

**Funcionalidades Principais:**
* [cite_start]Cadastro e login de usuários[cite: 37].
* [cite_start]Gestão de itens encontrados[cite: 38].
* [cite_start]Sistema de reivindicações[cite: 39].
* [cite_start]Painéis administrativos[cite: 39].

---

## 2. METODOLOGIA UTILIZADA

### 2.1 Modelo em Espiral Adotado
[cite_start]Adotou-se o modelo em espiral por sua adequação a projetos com requisitos evolutivos, permitindo validações constantes e redução de riscos através de ciclos iterativos[cite: 42].

### 2.2 Prototipação Evolutiva
[cite_start]Utilizou-se prototipação evolutiva, onde cada versão do protótipo incorporou novas funcionalidades baseadas nas validações realizadas com o cliente[cite: 44].

### 2.3 Iterações Realizadas
* [cite_start]**Iteração 1 (2 semanas):** Levantamento de requisitos e diagramas UML iniciais[cite: 46].
* [cite_start]**Iteração 2 (3 semanas):** Desenvolvimento do módulo de segurança e protótipos[cite: 46].
* [cite_start]**Iteração 3 (4 semanas):** Implementação dos módulos principais e frontend[cite: 46].
* [cite_start]**Iteração 4 (2 semanas):** Testes, validações finais e documentação[cite: 47].

### 2.4 Consultas ao Cliente
Realizaram-se reuniões quinzenais com o professor para:
* [cite_start]Validação dos protótipos[cite: 50].
* [cite_start]Revisão dos diagramas UML[cite: 51].
* [cite_start]Demonstração das funcionalidades implementadas[cite: 52].
* [cite_start]Ajustes baseados no feedback recebido[cite: 53].

---

## 3. REGISTRO DAS ENTREVISTAS COM O CLIENTE

### Entrevista 1 - 00/11/2025
* [cite_start]**Participantes:** Carlos Eduardo, Professor Antônio Alberto[cite: 56].
* [cite_start]**Assuntos Discutidos:** Definição do escopo, validação dos requisitos iniciais, discussão sobre tecnologias [cite: 58-60].
* [cite_start]**Decisões Tomadas:** Sistema web com três níveis de acesso, Banco de dados MySQL obrigatório, Interface responsiva para desktop e mobile [cite: 62-64].

### Entrevista 2 - 00/11/2025
* [cite_start]**Participantes:** Carlos Eduardo, Professor Antônio Alberto[cite: 66].
* [cite_start]**Assuntos Discutidos:** Revisão dos diagramas de casos de uso, validação do protótipo de baixa fidelidade, definição dos fluxos principais [cite: 68-70].
* [cite_start]**Decisões Tomadas:** Aprovação do diagrama de casos de uso, validação do fluxo de reivindicação, definição dos perfis de usuário [cite: 72-74].

### Entrevista 3 - 00/11/2025
* [cite_start]**Participantes:** Carlos Eduardo, Professor Antônio Alberto[cite: 76].
* [cite_start]**Assuntos Discutidos:** Demonstração do protótipo funcional, revisão da modelagem do banco de dados, validação do módulo de segurança [cite: 78-80].
* [cite_start]**Decisões Tomadas:** Aprovação da arquitetura do sistema, validação do DER, confirmação das tecnologias escolhidas [cite: 83-85].

### Entrevista 4 - 00/11/2025
* [cite_start]**Participantes:** Carlos Eduardo, Professor Antônio Alberto[cite: 87].
* [cite_start]**Assuntos Discutidos:** Apresentação do sistema quase completo, validação da responsividade, revisão dos casos de teste [cite: 89-91].
* [cite_start]**Decisões Tomadas:** Aprovação da interface responsiva, validação dos fluxos completos, confirmação dos requisitos atendidos [cite: 93-95].

---

## 4. REGISTRO DO TEMPO INVESTIDO

[cite_start]**Tabela de Horas por Atividade** [cite: 97]

| Atividade | Horas Investidas |
| :--- | :--- |
| Planejamento e Requisitos | 0h |
| Diagramas UML | 0h |
| Prototipação | 0h |
| Módulo de Segurança (Autenticação e controle de acesso) | 0h |
| Módulo de Transação (Gestão de itens e reivindicações) | 0h |
| Banco de Dados (Modelagem e implementação MySQL) | 0h |
| Frontend Responsivo (Desktop, tablet e mobile) | 0h |
| Testes e Validação | 0h |
| Documentação | 0h |
| **TOTAL GERAL** | **0h** |

---

## 5. LEVANTAMENTO DE REQUISITOS

### 5.1 Requisitos Funcionais
1. [cite_start]**RF-01:** O sistema deve permitir cadastro e login de usuários[cite: 103].
2. [cite_start]**RF-02:** O sistema deve diferenciar três níveis de acesso (usuário, guarda, admin)[cite: 105].
3. [cite_start]**RF-03:** O guarda deve cadastrar itens achados com informações completas[cite: 106].
4. [cite_start]**RF-04:** O usuário deve visualizar itens disponíveis com filtros[cite: 108].
5. [cite_start]**RF-05:** O usuário deve poder reivindicar um item[cite: 109].
6. [cite_start]**RF-06:** O guarda deve aprovar, negar e registrar devoluções[cite: 110].
7. [cite_start]**RF-07:** Itens devolvidos devem sair da listagem pública[cite: 111].

### 5.2 Requisitos Não-Funcionais
1. [cite_start]**RNF-01:** A aplicação deve ser web responsiva (desktop e mobile)[cite: 113].
2. [cite_start]**RNF-02:** O sistema deve utilizar banco de dados MySQL[cite: 115].
3. [cite_start]**RNF-03:** O backend deve garantir segurança e autenticação[cite: 117].
4. [cite_start]**RNF-04:** A interface deve ser intuitiva e de fácil uso[cite: 119].
5. [cite_start]**RNF-05:** Três níveis de acesso diferentes devem ser implementados[cite: 120].

### 5.3 Atores do Sistema e Níveis de Acesso
* [cite_start]**Usuário Comum (Aluno/Visitante):** Visualizar itens disponíveis, Reivindicar itens, Acompanhar reivindicações [cite: 122-125].
* [cite_start]**Guarda (Funcionário):** Cadastrar itens encontrados, Aprovar/rejeitar reivindicações, Registrar devoluções [cite: 126-129].
* [cite_start]**Administrador:** Gerenciar usuários, Visualizar relatórios, Configurar sistema [cite: 130-133].

---

## 6. DIAGRAMAS UML

### 6.1 Diagrama de Casos de Uso
*(Atores e Ações identificadas no diagrama)*
* [cite_start]**Usuário:** Visualizar itens perdidos, Fazer cadastro, Reivindicar item, Fazer login [cite: 136-140].
* [cite_start]**Guarda:** Fazer login, Cadastrar item, Registrar devolução, Aprovar/Negar devolução [cite: 140-145].
* [cite_start]**Administrador:** Fazer login, Gerenciar usuários [cite: 144-146].

### 6.2 Diagrama de Classes
*(Classes e Atributos identificados)*
* [cite_start]**Usuario:** id, nome, e-mail, senha, tipo [cite: 148-152]. [cite_start]Métodos: autenticar(), atualizarPerfil() [cite: 153-154].
* [cite_start]**Reivindicacao:** id, idUsuario, idItem, status, data [cite: 155-160]. [cite_start]Métodos: solicitar(), instalar(), negar() [cite: 161-163].
* [cite_start]**Item:** id, nome, descrição, localEncontrado, dataAchado, status, foto, idGuarda [cite: 167-173]. [cite_start]Métodos: cadastrar(), atualizar() [cite: 174-175].
* [cite_start]**Devolucao:** id, idReivindicação, data, entreguePor [cite: 177-180]. [cite_start]Métodos: registrar(), confirmar()[cite: 181].

### 6.3 Diagramas de Sequência
* [cite_start]**Login:** Fluxo de dados entre Usuário, Frontend, Backend e Banco MySQL resultando em token JWT[cite: 165, 197].
* [cite_start]**Reivindicação:** Fluxo de criação de reivindicação pendente e notificação ao guarda[cite: 199, 208].
* [cite_start]**Aprovar e Registrar Devolução:** Atualização de status da reivindicação e do item, inserção na tabela devoluções[cite: 213, 235].

### 6.4 Diagrama de Atividades
[cite_start]Fluxo desde "Item é encontrado" até "Item sai da listagem" (devolução) ou "Item continua disponível" (reivindicação negada/não reconhecido) [cite: 231-256].

### 6.5 Diagrama de Estados
[cite_start]Estados do Item: Disponível -> Reivindicado -> Pendente_Aprovacao -> (Aprovado / Negado) -> Aguardando_Devolucao -> Devolvido [cite: 257-272].

### 6.6 Diagrama de Componentes
[cite_start]Interação entre Cliente (Desktop/Mobile), Servidor Web (Frontend/Backend), Banco de Dados MySQL e Servidor de Arquivos [cite: 273-291].

### 6.7 Diagrama de Banco de Dados (DER)
* [cite_start]**Tabela usuario:** id_usuario, nome, email, senha, tipo, telefone, criado_em [cite: 293-300].
* [cite_start]**Tabela itens:** id_item, descricao, local_encontrado, data_encontro, foto, status, id_guarda [cite: 301-310].
* [cite_start]**Tabela reivindicacoes:** id_reivindicacao, id_item, id_usuario, justificativa, data_reivindicacao, status [cite: 312-318].
* [cite_start]**Tabela devolucoes:** id_devolucao, id_reivindicacao, data_devolucao, observacoes, id_guarda_responsavel [cite: 320-322].

---

## 7. PROTÓTIPOS DE TELAS

### 7.1 Evolução dos Protótipos
* Baixa Fidelidade (Wireframes).
* Média Fidelidade.
* [cite_start]Alta Fidelidade [cite: 325-327].

### 7.2 Telas Finais Implementadas
* [cite_start]Versões Desktop e Mobile [cite: 329-330].

### 7.3 Validação pelo Cliente
[cite_start]Cada versão do protótipo foi validada pelo professor através de reuniões de demonstração, com feedback incorporado nas iterações seguintes[cite: 332].

---

## 8. DESCRIÇÃO DA ARQUITETURA E TECNOLOGIAS

### 8.1 Frontend
* HTML5, CSS3, JavaScript.
* Bootstrap 5 para responsividade.
* [cite_start]Interface adaptável para desktop, tablet e mobile [cite: 334-337].

### 8.2 Backend
* Node.js com Express.js.
* Autenticação com sessões.
* [cite_start]API RESTful para comunicação [cite: 338-341].

### 8.3 Banco de Dados
* MySQL 8.0 como SGBD.
* [cite_start]Tabelas: usuarios, itens, reivindicacoes, devolucoes [cite: 342-344].

### 8.4 Responsividade Multiplataforma
* **Desktop:** Layout completo com sidebar.
* **Tablet:** Layout adaptado com navegação simplificada.
* [cite_start]**Mobile:** Design mobile-first com menu hamburguer e Media Queries [cite: 346-349].

---

## 9. MÓDULOS DESENVOLVIDOS

### 9.1 Módulo de Segurança
* Sistema de autenticação com três níveis de acesso.
* Criptografia de senhas.
* Controle de sessões.
* [cite_start]Middleware de autorização [cite: 351-355].

### 9.2 Módulo de Transação
* Cadastro e gestão de itens.
* Fluxo completo de reivindicação.
* Aprovação/negação de solicitações.
* Registro de devoluções.
* [cite_start]Atualização automática de status [cite: 356-359].

---

## 10. TESTES REALIZADOS

### 10.1 Casos de Teste Principais
* [cite_start]**CT-01: Autenticação e Controle de Acesso:** Login, verificação de níveis e redirecionamento [cite: 362-365].
* [cite_start]**CT-02: Responsividade:** Layout em desktop, tablet e mobile, navegação touch-friendly [cite: 366-371].
* [cite_start]**CT-03: Fluxo de Reivindicação:** Reivindicação bem-sucedida, negada e registro de devolução [cite: 372-375].
* [cite_start]**CT-04: Banco de Dados MySQL:** CRUD de usuários e itens, transações e integridade referencial [cite: 376-380].

### 10.2 Evidências
[cite_start]*(Descrições dos testes realizados e comprovação do sistema funcionando)*[cite: 382].

---

## 11. CONCLUSÃO E REFLEXÕES

### 11.1 Aprendizados sobre Engenharia de Software
O desenvolvimento deste sistema proporcionou insights valiosos sobre:
* Importância do levantamento completo de requisitos.
* Valor da modelagem cuidadosa com UML.
* Necessidade de considerar os usuários finais.
* [cite_start]Eficácia do modelo em espiral para projetos acadêmicos [cite: 384-387].

### 11.2 Principais Dificuldades Enfrentadas
* [cite_start]**Técnicas:** Sincronização entre frontend e backend, responsividade multiplataforma, gestão de estado e integração com MySQL [cite: 389-392].
* [cite_start]**Metodológicas:** Estimativa de tempo, balanceamento entre qualidade e prazos, e adaptação às mudanças de requisitos [cite: 393-396].

### 11.3 Lições Aprendidas com o Modelo em Espiral e Prototipação
* [cite_start]**Vantagens:** Flexibilidade para mudanças, redução de riscos, melhor acompanhamento e maior satisfação do cliente [cite: 398-401].
* [cite_start]**Desafios:** Disciplina de escopo, dificuldade em estimar iterações e custo de documentação [cite: 402-403].

### 11.4 Sugestões de Melhoria para Trabalhos Futuros
* Implementar ferramentas de gestão de projeto desde o início.
* Estabelecer critérios de aceitação mais claros.
* Realizar revisões de código regulares.
* Investir mais tempo em testes automatizados.
* [cite_start]Adotar framework frontend e implementar API REST para desacoplamento [cite: 404-411].

---

## 12. ANEXOS

### ANEXO A - Prints das Entrevistas
[cite_start]*(Conteúdo de registro visual das reuniões)*[cite: 413].

### ANEXO B - Script Completo do Banco MySQL

```sql
CREATE DATABASE achados_perdidos_icet;
USE achados_perdidos_icet;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('usuario', 'guarda', 'admin') DEFAULT 'usuario',
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    local_encontrado VARCHAR(100) NOT NULL,
    data_encontrado DATE NOT NULL,
    status ENUM('disponivel', 'reivindicado', 'devolvido') DEFAULT 'disponivel',
    guarda_id INT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (guarda_id) REFERENCES usuarios (id)
);

CREATE TABLE reivindicacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    item_id INT NOT NULL,
    status ENUM('pendente', 'aprovada', 'negada', 'concluida') DEFAULT 'pendente',
    data_reivindicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
    FOREIGN KEY (item_id) REFERENCES itens (id)
);

CREATE TABLE mensagens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reivindicacao_id INT NOT NULL,
    usuario_id INT NOT NULL,
    texto TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reivindicacao_id) REFERENCES reivindicacoes (id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);

CREATE TABLE devolucoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reivindicacao_id INT NOT NULL,
    data_devolucao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reivindicacao_id) REFERENCES reivindicacoes (id)
);
