# [cite_start]SISTEMA ACHADOS E PERDIDOS - ICET/UFAM [cite: 1]

**Integrantes:**
* [cite_start]Carlos Eduardo [cite: 3]
* [cite_start]Cintia Seixas [cite: 4]

**Informações do Projeto:**
* [cite_start]**Disciplina:** Desenvolvimento Web [cite: 5]
* [cite_start]**Professor:** Antônio Alberto [cite: 6]
* [cite_start]**Data de Entrega:** 03/12/2025 [cite: 7]

---

## [cite_start]1. Introdução [cite: 9]

### 1.1 Apresentação do Sistema
[cite_start]O Sistema "Achados e Perdidos - ICET/UFAM" é uma aplicação web desenvolvida para modernizar o processo de gestão de objetos perdidos e encontrados no Instituto de Ciências Exatas e Tecnologia da UFAM. [cite: 22, 23]

### 1.2 Justificativa da Escolha
[cite_start]A escolha baseou-se na necessidade real de substituir o sistema manual atual (cadernos de registro) por uma solução digital que ofereça maior eficiência, transparência e acessibilidade. [cite: 24, 25]

### 1.3 Objetivo Geral
[cite_start]Desenvolver uma aplicação web completa para gestão de achados e perdidos no ICET/UFAM, integrada a banco de dados MySQL e com interface responsiva. [cite: 26, 27]

### [cite_start]1.4 Objetivos Específicos [cite: 28]
* [cite_start]Implementar sistema de autenticação com três níveis de acesso. [cite: 29]
* [cite_start]Desenvolver módulo de cadastro e gestão de itens. [cite: 30]
* [cite_start]Criar fluxo completo de reivindicação e devolução. [cite: 31]

### [cite_start]1.5 Escopo Definido [cite: 32]
**Módulos Implementados:**
* [cite_start]Módulo de Segurança (autenticação e autorização). [cite: 34]
* [cite_start]Módulo de Transação (processo de reivindicação e devolução). [cite: 35]

**Funcionalidades Principais:**
* [cite_start]Cadastro e login de usuários. [cite: 37]
* [cite_start]Gestão de itens encontrados. [cite: 38]
* [cite_start]Sistema de reivindicações. [cite: 39]
* [cite_start]Painéis administrativos. [cite: 39]

---

## [cite_start]2. Metodologia Utilizada [cite: 40]

### 2.1 Modelo em Espiral Adotado
[cite_start]Adotou-se o modelo em espiral por sua adequação a projetos com requisitos evolutivos, permitindo validações constantes e redução de riscos através de ciclos iterativos. [cite: 41, 42]

### 2.2 Prototipação Evolutiva
[cite_start]Utilizou-se prototipação evolutiva, onde cada versão do protótipo incorporou novas funcionalidades baseadas nas validações realizadas com o cliente. [cite: 43, 44]

### [cite_start]2.3 Iterações Realizadas [cite: 45]
* [cite_start]**Iteração 1 (2 semanas):** Levantamento de requisitos e diagramas UML iniciais. [cite: 46]
* [cite_start]**Iteração 2 (3 semanas):** Desenvolvimento do módulo de segurança e protótipos. [cite: 46]
* [cite_start]**Iteração 3 (4 semanas):** Implementação dos módulos principais e frontend. [cite: 46]
* [cite_start]**Iteração 4 (2 semanas):** Testes, validações finais e documentação. [cite: 47]

### [cite_start]2.4 Consultas ao Cliente [cite: 48]
Realizaram-se reuniões quinzenais com o professor para:
* [cite_start]Validação dos protótipos. [cite: 50]
* [cite_start]Revisão dos diagramas UML. [cite: 51]
* [cite_start]Demonstração das funcionalidades implementadas. [cite: 52]
* [cite_start]Ajustes baseados no feedback recebido. [cite: 53]

---

## [cite_start]3. Registro das Entrevistas com o Cliente [cite: 11]

> **Nota:** As datas listadas abaixo seguem o registro original do documento.

**Entrevista 1**
* **Data:** 00/11/2025 | [cite_start]**Participantes:** Carlos Eduardo, Prof. Antônio Alberto [cite: 55, 56]
* [cite_start]**Assuntos:** Definição do escopo, validação de requisitos iniciais, tecnologias. [cite: 57-60]
* [cite_start]**Decisões:** Sistema web com três níveis de acesso, BD MySQL obrigatório, Interface responsiva. [cite: 61-64]

**Entrevista 2**
* [cite_start]**Data:** 00/11/2025 [cite: 65, 66]
* [cite_start]**Assuntos:** Revisão de casos de uso, validação de protótipo de baixa fidelidade, fluxos principais. [cite: 67-70]
* [cite_start]**Decisões:** Aprovação de diagramas, validação do fluxo de reivindicação, definição de perfis. [cite: 71-74]

**Entrevista 3**
* [cite_start]**Data:** 00/11/2025 [cite: 75, 76]
* [cite_start]**Assuntos:** Protótipo funcional, modelagem do banco de dados, módulo de segurança. [cite: 77-80]
* [cite_start]**Decisões:** Aprovação da arquitetura, validação do DER, confirmação de tecnologias. [cite: 81-85]

**Entrevista 4**
* [cite_start]**Data:** 00/11/2025 [cite: 86, 87]
* [cite_start]**Assuntos:** Apresentação do sistema, validação da responsividade, revisão de casos de teste. [cite: 88-91]
* [cite_start]**Decisões:** Aprovação da interface, validação dos fluxos completos, confirmação de requisitos. [cite: 92-95]

---

## [cite_start]4. Registro do Tempo Investido [cite: 96]

| Atividade | Horas Investidas |
| :--- | :--- |
| **Planejamento e Requisitos** | 0h |
| **Diagramas UML** | 0h |
| **Prototipação** | 0h |
| **Módulo de Segurança** (Autenticação e controle) | 0h |
| **Módulo de Transação** (Gestão de itens e reivindicações) | 0h |
| **Banco de Dados** (Modelagem e MySQL) | 0h |
| **Frontend Responsivo** (Desktop, tablet e mobile) | 0h |
| **Testes e Validação** | 0h |
| **Documentação** | 0h |
| **TOTAL GERAL** | **0h** |
[cite_start][cite: 98]

---

## [cite_start]5. Levantamento de Requisitos [cite: 101]

### [cite_start]5.1 Requisitos Funcionais [cite: 102]
1.  [cite_start]**RF-01:** O sistema deve permitir cadastro e login de usuários. [cite: 103]
2.  [cite_start]**RF-02:** O sistema deve diferenciar três níveis de acesso (usuário, guarda, admin). [cite: 105]
3.  [cite_start]**RF-03:** O guarda deve cadastrar itens achados com informações completas. [cite: 106]
4.  [cite_start]**RF-04:** O usuário deve visualizar itens disponíveis com filtros. [cite: 108]
5.  [cite_start]**RF-05:** O usuário deve poder reivindicar um item. [cite: 109]
6.  [cite_start]**RF-06:** O guarda deve aprovar, negar e registrar devoluções. [cite: 110]
7.  [cite_start]**RF-07:** Itens devolvidos devem sair da listagem pública. [cite: 111]

### [cite_start]5.2 Requisitos Não-Funcionais [cite: 112]
1.  [cite_start]**RNF-01:** A aplicação deve ser web responsiva (desktop e mobile). [cite: 113]
2.  [cite_start]**RNF-02:** O sistema deve utilizar banco de dados MySQL. [cite: 115]
3.  [cite_start]**RNF-03:** O backend deve garantir segurança e autenticação. [cite: 117]
4.  [cite_start]**RNF-04:** A interface deve ser intuitiva e de fácil uso. [cite: 119]
5.  [cite_start]**RNF-05:** Três níveis de acesso diferentes devem ser implementados. [cite: 120]

### [cite_start]5.3 Atores do Sistema e Níveis de Acesso [cite: 121]
* [cite_start]**Usuário Comum (Aluno/Visitante):** Visualizar itens, reivindicar itens, acompanhar reivindicações. [cite: 122-125]
* [cite_start]**Guarda (Funcionário):** Cadastrar itens, aprovar/rejeitar reivindicações, registrar devoluções. [cite: 126-129]
* [cite_start]**Administrador:** Gerenciar usuários, visualizar relatórios, configurar sistema. [cite: 130-133]

---

## [cite_start]6. Diagramas UML (Resumo) [cite: 134]

Esta seção descreve a estrutura dos diagramas projetados.

### [cite_start]6.1 Diagrama de Casos de Uso [cite: 135]
[cite_start]Mapeia as interações entre Usuário, Guarda e Administrador com as funcionalidades principais (Login, Cadastro, Reivindicação, etc.). [cite: 136-146]

### [cite_start]6.2 Diagrama de Classes (Principais Classes) [cite: 147]
* **Usuario:** `id`, `nome`, `email`, `senha`, `tipo`. [cite_start]Métodos: `autenticar()`, `atualizarPerfil()`. [cite: 148-154]
* **Item:** `id`, `nome`, `descrição`, `localEncontrado`, `dataAchado`, `status`, `foto`, `idGuarda`. [cite_start]Métodos: `cadastrar()`, `atualizar()`. [cite: 167-175]
* **Reivindicacao:** `id`, `idUsuario`, `idItem`, `status`, `data`. [cite_start]Métodos: `solicitar()`, `negar()`. [cite: 155-163]
* **Devolucao:** `id`, `idReivindicação`, `data`, `entreguePor`. [cite_start]Métodos: `registrar()`, `confirmar()`. [cite: 178-181]

### [cite_start]6.3 Diagramas de Sequência [cite: 164]
[cite_start]Foram mapeados os fluxos de **Login** (verificação de credenciais e token JWT), **Reivindicação** (criação de solicitação e notificação) e **Aprovação/Devolução** (atualização de status no banco de dados). [cite: 165, 199, 213]

### [cite_start]6.4 Diagrama de Atividades [cite: 231]
[cite_start]Fluxo desde o "Item é encontrado" até "Item sai da listagem", passando por decisões como "Alguém reconhece o item?" e aprovações do guarda. [cite: 240-256]

### [cite_start]6.5 Diagrama de Estados [cite: 257]
[cite_start]Estados do Item: `Disponível` -> `Reivindicado` -> `Pendente_Aprovação` -> (`Aprovado` ou `Negado`) -> `Aguardando_Devolução` -> `Devolvido`. [cite: 258-272]

### [cite_start]6.6 Diagrama de Componentes [cite: 273]
Arquitetura Cliente-Servidor envolvendo:
* [cite_start]**Cliente:** Desktop, Smartphone, Tablet (via Browser). [cite: 274-279]
* [cite_start]**Servidor Web:** Frontend (HTML/CSS/JS), Backend (Node.js/Express ou PHP), Banco MySQL. [cite: 283-291]

### [cite_start]6.7 Diagrama de Banco de Dados (DER) [cite: 292]
[cite_start]Entidades principais: `usuario`, `itens`, `reivindicacoes`, `devolucoes` com seus respectivos relacionamentos e chaves estrangeiras. [cite: 293-322]

---

## [cite_start]7. Protótipos de Telas [cite: 323]

O desenvolvimento seguiu três fases de prototipação:
1.  [cite_start]**Baixa Fidelidade:** Wireframes iniciais. [cite: 325]
2.  [cite_start]**Média Fidelidade:** Design básico. [cite: 326]
3.  [cite_start]**Alta Fidelidade:** Telas finais implementadas. [cite: 327]

[cite_start]As telas foram validadas pelo cliente (professor) em reuniões de demonstração. [cite: 331, 332]

---

## [cite_start]8. Arquitetura e Tecnologias [cite: 333]

### [cite_start]8.1 Frontend [cite: 334]
* [cite_start]HTML5, CSS3, JavaScript. [cite: 335]
* [cite_start]Bootstrap 5 para responsividade. [cite: 336]

### [cite_start]8.2 Backend [cite: 338]
* [cite_start]Node.js com Express.js. [cite: 339]
* [cite_start]Autenticação com sessões. [cite: 340]
* [cite_start]API RESTful. [cite: 341]

### [cite_start]8.3 Banco de Dados [cite: 342]
* [cite_start]MySQL 8.0. [cite: 343]
* [cite_start]Tabelas principais: `usuarios`, `itens`, `reivindicacoes`, `devolucoes`. [cite: 344]

### [cite_start]8.4 Responsividade [cite: 346]
[cite_start]Adaptável via Media Queries CSS para Desktop, Tablet e Mobile (design mobile-first). [cite: 347-349]

---

## [cite_start]9. Módulos Desenvolvidos [cite: 350]

### [cite_start]9.1 Módulo de Segurança [cite: 351]
* [cite_start]Autenticação com três níveis de acesso. [cite: 352]
* [cite_start]Criptografia de senhas. [cite: 353]
* [cite_start]Controle de sessões e Middleware de autorização. [cite: 354, 355]

### [cite_start]9.2 Módulo de Transação [cite: 356]
* [cite_start]Cadastro e gestão de itens. [cite: 357]
* [cite_start]Fluxo de reivindicação (aprovação/negação). [cite: 358]
* [cite_start]Registro de devoluções e atualização automática de status. [cite: 358, 359]

---

## [cite_start]10. Testes Realizados [cite: 360]

Foram executados os seguintes casos de teste principais:
* [cite_start]**CT-01 (Autenticação):** Login, verificação de níveis de acesso e redirecionamento. [cite: 362-365]
* [cite_start]**CT-02 (Responsividade):** Verificação de layout em Desktop (1200px+), Tablet e Mobile, e navegação touch. [cite: 366-371]
* [cite_start]**CT-03 (Fluxo de Reivindicação):** Testes de sucesso, negação e devolução. [cite: 372-375]
* [cite_start]**CT-04 (Banco de Dados):** CRUD de usuários e itens, integridade referencial. [cite: 376-380]

---

## [cite_start]11. Conclusão e Reflexões [cite: 383]

[cite_start]O projeto permitiu aplicar conceitos de Engenharia de Software, destacando a importância do levantamento de requisitos e modelagem UML. [cite: 384-386]

**Dificuldades Enfrentadas:**
* [cite_start]*Técnicas:* Sincronização frontend-backend, responsividade e integração com MySQL. [cite: 389-392]
* [cite_start]*Metodológicas:* Estimativa de tempo e adaptação a mudanças. [cite: 393-396]

**Lições do Modelo em Espiral:**
[cite_start]Proporcionou flexibilidade para mudanças e redução de riscos através de validações frequentes, apesar do desafio em estimar o número de iterações. [cite: 397-403]

[cite_start]**Sugestões Futuras:** Implementar testes automatizados, adotar frameworks frontend e ferramentas de gestão de projeto desde o início. [cite: 404-411]

---

## [cite_start]12. Anexos [cite: 412]

### [cite_start]Script SQL do Banco de Dados [cite: 415]

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
