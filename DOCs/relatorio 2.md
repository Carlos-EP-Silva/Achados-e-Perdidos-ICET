# SISTEMA ACHADOS E PERDIDOS - ICET/UFAM [cite: 1]

**Integrantes:**
* Carlos Eduardo [cite: 3]
* Cintia Seixas [cite: 4]

**Informações do Projeto:**
* **Disciplina:** Desenvolvimento Web [cite: 5]
* **Professor:** Antônio Alberto [cite: 6]
* **Data de Entrega:** 03/12/2025 [cite: 7]

---

## 1. Introdução [cite: 9]

### 1.1 Apresentação do Sistema
O Sistema "Achados e Perdidos - ICET/UFAM" é uma aplicação web desenvolvida para modernizar o processo de gestão de objetos perdidos e encontrados no Instituto de Ciências Exatas e Tecnologia da UFAM. [cite: 22, 23]

### 1.2 Justificativa da Escolha
A escolha baseou-se na necessidade real de substituir o sistema manual atual (cadernos de registro) por uma solução digital que ofereça maior eficiência, transparência e acessibilidade. [cite: 24, 25]

### 1.3 Objetivo Geral
Desenvolver uma aplicação web completa para gestão de achados e perdidos no ICET/UFAM, integrada a banco de dados MySQL e com interface responsiva. [cite: 26, 27]

### 1.4 Objetivos Específicos [cite: 28]
* Implementar sistema de autenticação com três níveis de acesso. [cite: 29]
* Desenvolver módulo de cadastro e gestão de itens. [cite: 30]
* Criar fluxo completo de reivindicação e devolução. [cite: 31]

### 1.5 Escopo Definido [cite: 32]
**Módulos Implementados:**
* Módulo de Segurança (autenticação e autorização). [cite: 34]
* Módulo de Transação (processo de reivindicação e devolução). [cite: 35]

**Funcionalidades Principais:**
* Cadastro e login de usuários. [cite: 37]
* Gestão de itens encontrados. [cite: 38]
* Sistema de reivindicações. [cite: 39]
* Painéis administrativos. [cite: 39]

---

## 2. Metodologia Utilizada [cite: 40]

### 2.1 Modelo em Espiral Adotado
Adotou-se o modelo em espiral por sua adequação a projetos com requisitos evolutivos, permitindo validações constantes e redução de riscos através de ciclos iterativos. [cite: 41, 42]

### 2.2 Prototipação Evolutiva
Utilizou-se prototipação evolutiva, onde cada versão do protótipo incorporou novas funcionalidades baseadas nas validações realizadas com o cliente. [cite: 43, 44]

### 2.3 Iterações Realizadas [cite: 45]
* **Iteração 1 (2 semanas):** Levantamento de requisitos e diagramas UML iniciais. [cite: 46]
* **Iteração 2 (3 semanas):** Desenvolvimento do módulo de segurança e protótipos. [cite: 46]
* **Iteração 3 (4 semanas):** Implementação dos módulos principais e frontend. [cite: 46]
* **Iteração 4 (2 semanas):** Testes, validações finais e documentação. [cite: 47]

### 2.4 Consultas ao Cliente [cite: 48]
Realizaram-se reuniões com o professor para:
* Validação dos protótipos. [cite: 50]
* Revisão dos diagramas UML. [cite: 51]
* Demonstração das funcionalidades implementadas. [cite: 52]
* Ajustes baseados no feedback recebido. [cite: 53]

---

## 3. Registro das Entrevistas com o Cliente [cite: 11]

> **Nota:** As datas listadas abaixo seguem o registro original do documento.

**Entrevista 1**
* **Data:** 00/11/2025 | **Participantes:** Carlos Eduardo, Prof. Antônio Alberto [cite: 55, 56]
* **Assuntos:** Definição do escopo, validação de requisitos iniciais, tecnologias. [cite: 57-60]
* **Decisões:** Sistema web com três níveis de acesso, BD MySQL obrigatório, Interface responsiva. [cite: 61-64]

**Entrevista 2**
* **Data:** 26/11/2025 [cite: 65, 66]
* **Assuntos:** Revisão de casos de uso, validação de protótipo de baixa fidelidade, fluxos principais. [cite: 67-70]
* **Decisões:** Aprovação de diagramas, validação do fluxo de reivindicação, definição de perfis. [cite: 71-74]

**Entrevista 3**
* **Data:** 00/11/2025 [cite: 75, 76]
* **Assuntos:** Protótipo funcional, modelagem do banco de dados, módulo de segurança. [cite: 77-80]
* **Decisões:** Aprovação da arquitetura, validação do DER, confirmação de tecnologias. [cite: 81-85]

**Entrevista 4**
* **Data:** 00/11/2025 [cite: 86, 87]
* **Assuntos:** Apresentação do sistema, validação da responsividade, revisão de casos de teste. [cite: 88-91]
* **Decisões:** Aprovação da interface, validação dos fluxos completos, confirmação de requisitos. [cite: 92-95]

---

## 4. Registro do Tempo Investido [cite: 96]

| Atividade | Horas Investidas |
| :--- | :--- |
| **Planejamento e Requisitos** | 5h |
| **Diagramas UML** | 0h |
| **Prototipação** | 0h |
| **Módulo de Segurança** (Autenticação e controle) | 0h |
| **Módulo de Transação** (Gestão de itens e reivindicações) | 0h |
| **Banco de Dados** (Modelagem e MySQL) | 0h |
| **Frontend Responsivo** (Desktop, tablet e mobile) | 0h |
| **Testes e Validação** | 0h |
| **Documentação** | 0h |
| **TOTAL GERAL** | **0h** |
[cite: 98]

---

## 5. Levantamento de Requisitos [cite: 101]

### 5.1 Requisitos Funcionais [cite: 102]
ID|Descrição|Ator Principal|
|:---|:----|:-----|
|RF01|Permitir cadastro e login.|Todos|
|RF02|Cadastrar Item Perdido: O usuário registra o que perdeu (categoria, descrição, local provável).|Usuário|
|RF03|Cadastrar Item Encontrado: O Guarda registra um item entregue no balcão (foto, descrição, local encontrado).|Guarda|
|RF04|Consultar Itens: Pesquisa com filtros (data, categoria, local).|Todos|
|RF05|Reivindicar Item: O usuário sinaliza que um item encontrado lhe pertence.|Usuário|
|RF06|Registrar Devolução: O Guarda confirma a entrega do item, registrando o documento de quem retirou.|Guarda|
|RF07|Gerenciar Guardas: O Admin cadastra, edita ou remove acesso de Guardas.|Admin|
|RF08|Dashboard/Relatório: Visualização simples de itens pendentes e devolvidos.|Admin/Guarda|

### 5.2 Requisitos Não-Funcionais 

|ID|Descrição|
|:-|:--------|
|**RNF-01:**| A aplicação deve ser web responsiva (desktop e mobile). |
|**RNF-02:**| O sistema deve utilizar banco de dados MySQL. |
|**RNF-03:**| O backend deve garantir segurança e autenticação.|
|**RNF-04:**| A interface deve ser intuitiva e de fácil uso. |
|**RNF-05:**| Três níveis de acesso diferentes devem ser implementados. |
|**RNF-06:**| Disponibilidade: O sistema deve estar acessível via navegador web padrão (Chrome, Firefox, Edge).|

### 5.3 Regras de Negócio (RN)

Regras e restrições.
|ID|Descrição|
|:-|:--------|
|**RN01:**| Apenas perfis do tipo Guarda podem alterar o status de um item para "Devolvido".|
|**RN02:** |Usuários comuns não podem visualizar dados sensíveis (nome completo/documento) de quem achou ou reivindicou o item.|
|**RN03:** |O sistema não deve permitir a exclusão física de um item que já foi devolvido (apenas exclusão lógica/arquivamento para histórico).|
|**RN04:** |O cadastro de um item achado obrigatoriamente deve conter uma foto ou descrição detalhada.|

### 5.3 Atores do Sistema e Níveis de Acesso [cite: 121]
* **Usuário Comum (Aluno/Visitante):** Visualizar itens perdidos e achados, cadastrar itens perdidos. 
* **Guarda (Funcionário):** Cadastrar itens, aprovar/rejeitar reivindicações, registrar devoluções. 
* **Administrador:** Gerenciar usuários, visualizar relatórios, configurar sistema.

---

## 6. Diagramas UML (Resumo) [cite: 134]

Esta seção descreve a estrutura dos diagramas projetados.

### 6.1 Diagrama de Casos de Uso [cite: 135]
Mapeia as interações entre Usuário, Guarda e Administrador com as funcionalidades principais (Login, Cadastro, Reivindicação, etc.). [cite: 136-146]

### 6.2 Diagrama de Classes (Principais Classes) [cite: 147]
* **Usuario:** `id`, `nome`, `email`, `senha`, `tipo`. Métodos: `autenticar()`, `atualizarPerfil()`. [cite: 148-154]
* **Item:** `id`, `nome`, `descrição`, `localEncontrado`, `dataAchado`, `status`, `foto`, `idGuarda`. Métodos: `cadastrar()`, `atualizar()`. [cite: 167-175]
* **Reivindicacao:** `id`, `idUsuario`, `idItem`, `status`, `data`. Métodos: `solicitar()`, `negar()`. [cite: 155-163]
* **Devolucao:** `id`, `idReivindicação`, `data`, `entreguePor`. Métodos: `registrar()`, `confirmar()`. [cite: 178-181]

### 6.3 Diagramas de Sequência [cite: 164]
Foram mapeados os fluxos de **Login** (verificação de credenciais e token JWT), **Reivindicação** (criação de solicitação e notificação) e **Aprovação/Devolução** (atualização de status no banco de dados). [cite: 165, 199, 213]

### 6.4 Diagrama de Atividades [cite: 231]
Fluxo desde o "Item é encontrado" até "Item sai da listagem", passando por decisões como "Alguém reconhece o item?" e aprovações do guarda. [cite: 240-256]

### 6.5 Diagrama de Estados [cite: 257]
Estados do Item: `Disponível` -> `Reivindicado` -> `Pendente_Aprovação` -> (`Aprovado` ou `Negado`) -> `Aguardando_Devolução` -> `Devolvido`. [cite: 258-272]

### 6.6 Diagrama de Componentes [cite: 273]
Arquitetura Cliente-Servidor envolvendo:
* **Cliente:** Desktop, Smartphone, Tablet (via Browser). [cite: 274-279]
* **Servidor Web:** Frontend (HTML/CSS/JS), Backend (Node.js/Express ou PHP), Banco MySQL. [cite: 283-291]

### 6.7 Diagrama de Banco de Dados (DER) [cite: 292]
Entidades principais: `usuario`, `itens`, `reivindicacoes`, `devolucoes` com seus respectivos relacionamentos e chaves estrangeiras. [cite: 293-322]

---

## 7. Protótipos de Telas [cite: 323]

O desenvolvimento seguiu três fases de prototipação:
1.  **Baixa Fidelidade:** Wireframes iniciais. [cite: 325]
2.  **Média Fidelidade:** Design básico. [cite: 326]
3.  **Alta Fidelidade:** Telas finais implementadas. [cite: 327]

As telas foram validadas pelo cliente (professor) em reuniões de demonstração. [cite: 331, 332]

---

## 8. Arquitetura e Tecnologias [cite: 333]

### 8.1 Frontend [cite: 334]
* HTML5, CSS3, JavaScript. [cite: 335]
* Bootstrap 5 para responsividade. [cite: 336]

### 8.2 Backend [cite: 338]
* Node.js com Express.js. [cite: 339]
* Autenticação com sessões. [cite: 340]
* API RESTful. [cite: 341]

### 8.3 Banco de Dados [cite: 342]
* MySQL 8.0. [cite: 343]
* Tabelas principais: `usuarios`, `itens`, `reivindicacoes`, `devolucoes`. [cite: 344]

### 8.4 Responsividade [cite: 346]
Adaptável via Media Queries CSS para Desktop, Tablet e Mobile (design mobile-first). [cite: 347-349]

---

## 9. Módulos Desenvolvidos [cite: 350]

### 9.1 Módulo de Segurança [cite: 351]
* Autenticação com três níveis de acesso. [cite: 352]
* Criptografia de senhas. [cite: 353]
* Controle de sessões e Middleware de autorização. [cite: 354, 355]

### 9.2 Módulo de Transação [cite: 356]
* Cadastro e gestão de itens. [cite: 357]
* Fluxo de reivindicação (aprovação/negação). [cite: 358]
* Registro de devoluções e atualização automática de status. [cite: 358, 359]

---

## 10. Testes Realizados [cite: 360]

Foram executados os seguintes casos de teste principais:
* **CT-01 (Autenticação):** Login, verificação de níveis de acesso e redirecionamento. [cite: 362-365]
* **CT-02 (Responsividade):** Verificação de layout em Desktop (1200px+), Tablet e Mobile, e navegação touch. [cite: 366-371]
* **CT-03 (Fluxo de Reivindicação):** Testes de sucesso, negação e devolução. [cite: 372-375]
* **CT-04 (Banco de Dados):** CRUD de usuários e itens, integridade referencial. [cite: 376-380]

---

## 11. Conclusão e Reflexões [cite: 383]

O projeto permitiu aplicar conceitos de Engenharia de Software, destacando a importância do levantamento de requisitos e modelagem UML. [cite: 384-386]

**Dificuldades Enfrentadas:**
* *Técnicas:* Sincronização frontend-backend, responsividade e integração com MySQL. [cite: 389-392]
* *Metodológicas:* Estimativa de tempo e adaptação a mudanças. [cite: 393-396]

**Lições do Modelo em Espiral:**
Proporcionou flexibilidade para mudanças e redução de riscos através de validações frequentes, apesar do desafio em estimar o número de iterações. [cite: 397-403]

**Sugestões Futuras:** Implementar testes automatizados, adotar frameworks frontend e ferramentas de gestão de projeto desde o início. [cite: 404-411]

---

## 12. Anexos [cite: 412]

### Script SQL do Banco de Dados [cite: 415]

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
