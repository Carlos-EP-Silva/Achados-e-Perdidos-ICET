# SISTEMA ACHADOS E PERDIDOS - ICET/UFAM 

**Integrantes:**
* Carlos Eduardo 
* Cintia Seixas

**Informações do Projeto:**
* **Disciplina:** Desenvolvimento Web
* **Professor:** Antônio Alberto
* **Data de Entrega:** 03/12/2025 

---

## 1. Introdução 

### 1.1 Apresentação do Sistema
O Sistema "Achados e Perdidos - ICET/UFAM" é uma aplicação web desenvolvida para modernizar o processo de gestão de objetos perdidos e encontrados no Instituto de Ciências Exatas e Tecnologia da UFAM. 

### 1.2 Justificativa da Escolha
A escolha baseou-se na necessidade real de substituir o sistema manual atual (cadernos de registro) por uma solução digital que ofereça maior eficiência, transparência e acessibilidade. 

### 1.3 Objetivo Geral
Desenvolver uma aplicação web completa para gestão de achados e perdidos no ICET/UFAM, integrada a banco de dados MySQL e com interface responsiva. 

### 1.4 Objetivos Específicos
* Implementar sistema de autenticação com três níveis de acesso.
* Desenvolver módulo de cadastro e gestão de itens.
* Criar fluxo completo de reivindicação e devolução. 

### 1.5 Escopo Definido
**Módulos Implementados:**
* Módulo de Segurança (autenticação e autorização).
* Módulo de Transação (processo de reivindicação e devolução). 

**Funcionalidades Principais:**
* Cadastro e login de usuários.
* Gestão de itens encontrados. 
* Sistema de reivindicações. 
* Painéis administrativos. 

---

## 2. Metodologia Utilizada 

### 2.1 Modelo em Espiral Adotado
Adotou-se o modelo em espiral por sua adequação a projetos com requisitos evolutivos, permitindo validações constantes e redução de riscos através de ciclos iterativos. 

### 2.2 Prototipação Evolutiva
Utilizou-se prototipação evolutiva, onde cada versão do protótipo incorporou novas funcionalidades baseadas nas validações realizadas com o cliente. 

### 2.3 Iterações Realizadas 
* **Iteração 1 (2 semanas):** Levantamento de requisitos e diagramas UML iniciais. 
* **Iteração 2 (3 semanas):** Desenvolvimento do módulo de segurança e protótipos.
* **Iteração 3 (4 semanas):** Implementação dos módulos principais e frontend.
* **Iteração 4 (2 semanas):** Testes, validações finais e documentação. 

### 2.4 Consultas ao Cliente 
Realizaram-se reuniões com o professor para:
* Validação dos protótipos. 
* Revisão dos diagramas UML. 
* Demonstração das funcionalidades implementadas. 
* Ajustes baseados no feedback recebido. 

---

## 3. Registro das Entrevistas com o Cliente 

> **Nota:** As datas listadas abaixo seguem o registro original do documento.

**Entrevista 1**
* **Data:** 19/11/2025 | **Participantes:** Carlos Eduardo, Prof. Antônio Alberto 
* **Assuntos:** Definição do escopo, validação de requisitos iniciais, tecnologias. 
* **Decisões:** Sistema web com três níveis de acesso, BD MySQL obrigatório, Interface responsiva. 

**Entrevista 2**
* **Data:** 26/11/2025 
* **Assuntos:** Revisão de casos de uso, validação de protótipo de baixa fidelidade, fluxos principais.
* **Decisões:** Aprovação de diagramas, validação do fluxo de reivindicação, definição de perfis.

**Entrevista 3**
* **Data:** 00/11/2025 
* **Assuntos:** Protótipo funcional, modelagem do banco de dados, módulo de segurança. 
* **Decisões:** Aprovação da arquitetura, validação do DER, confirmação de tecnologias. 

**Entrevista 4**
* **Data:** 00/11/2025
* **Assuntos:** Apresentação do sistema, validação da responsividade, revisão de casos de teste.
* **Decisões:** Aprovação da interface, validação dos fluxos completos, confirmação de requisitos. 

---

## 4. Registro do Tempo Investido 

| Atividade | Horas Investidas |
| :--- | :--- |
| **Planejamento e Requisitos** | 3h |
| **Diagramas UML** | 6h |
| **Prototipação** | 0h |
| **Banco de Dados** (Modelagem e MySQL) | 4h |
| **Frontend Responsivo** (Desktop, tablet e mobile) | 0h |
| **Testes e Validação** | 0h |
| **Documentação** | 8h |
| **TOTAL GERAL** | **0h** |

---

## 5. Levantamento de Requisitos

### 5.1 Requisitos Funcionais
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
|RF09|Permite compartilhar um item à uma rede social externa|Usuario/Guarda|

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

## 6. Diagramas UML 

Esta seção descreve a estrutura dos diagramas projetados.

### 6.1 Diagrama de Casos de Uso
Mapeia as interações entre Usuário, Guarda e Administrador com as funcionalidades principais (Login, Cadastro, Reivindicação, etc.).
![Caso](https://drive.google.com/uc?export=view&id=1vXy-KPTIVQzeXCOQp5WvmsFCysg3zJnW)

---

### 6.2 Diagrama de Classes (Principais Classes)
![Classe](https://drive.google.com/uc?export=view&id=1zG_t1tOM-dH-yQvgjldCjS7JVsoXnZR5)

---

### 6.3 Diagramas de Sequência 
![Sequencia](https://drive.google.com/uc?export=view&id=1a1iC-e5ZfqMgjmIDwCKsaSsViiTfQY0A)

---

### 6.4 Diagrama de Atividades 
![Atividades](https://drive.google.com/uc?export=view&id=1JKsFxXIq-EHPQq5b4I_RqcEtxZU-xkEO)

---

### 6.5 Diagrama de Estados 
![Estados](https://drive.google.com/uc?export=view&id=11v93BprsdMYL39P0LsjtBGGj_xZFTdNz)

---

### 6.6 Diagrama de Componentes
![Componentes](https://drive.google.com/uc?export=view&id=1rlmxyX519bF8RMS-o56vzFI4CruV6uYB)

---

### 6.7 Diagrama de Banco de Dados (DER)
![DER](https://drive.google.com/uc?export=view&id=1QPX7SDLCybpGJmegDBEOP6NWxRiL-KYx)

---

## 7. Protótipos de Telas [cite: 323]

O desenvolvimento seguiu três fases de prototipação:
1.  **Baixa Fidelidade:** Wireframes iniciais. 
2.  **Média Fidelidade:** Design básico. 
3.  **Alta Fidelidade:** Telas finais implementadas. 

As telas foram validadas pelo cliente (professor) em reuniões de demonstração. 

---

## 8. Arquitetura e Tecnologias

### 8.1 Frontend 
* HTML5, CSS3, JavaScript.
* Bootstrap 5 para responsividade.

### 8.2 Backend 
* Node.js com Express.js. 
* Autenticação com sessões. 
* API RESTful. 
### 8.3 Banco de Dados 
* MySQL 8.0. 
### 8.4 Responsividade 
Adaptável via Media Queries CSS para Desktop, Tablet e Mobile (design mobile-first). 
---

## 9. Módulos Desenvolvidos 

### 9.1 Módulo de Segurança 
* Autenticação com três níveis de acesso.
* Criptografia de senhas.
* Controle de sessões e Middleware de autorização. 

### 9.2 Módulo de Transação 
* Cadastro e gestão de itens. 
* Fluxo de reivindicação (aprovação/negação).
* Registro de devoluções e atualização automática de status.

---

## 10. Testes Realizados

Foram executados os seguintes casos de teste principais:
* **CT-01 (Autenticação):** Login, verificação de níveis de acesso e redirecionamento. 
* **CT-02 (Responsividade):** Verificação de layout em Desktop (1200px+), Tablet e Mobile, e navegação touch. 
* **CT-03 (Fluxo de Reivindicação):** Testes de sucesso, negação e devolução.
* **CT-04 (Banco de Dados):** CRUD de usuários e itens, integridade referencial. 

---

## 11. Conclusão e Reflexões 

O projeto permitiu aplicar conceitos de Engenharia de Software, destacando a importância do levantamento de requisitos e modelagem UML. 

**Dificuldades Enfrentadas:**
* *Técnicas:* Sincronização frontend-backend, responsividade e integração com MySQL. 
* *Metodológicas:* Estimativa de tempo e adaptação a mudanças. 

**Lições do Modelo em Espiral:**
Proporcionou flexibilidade para mudanças e redução de riscos através de validações frequentes, apesar do desafio em estimar o número de iterações.

**Sugestões Futuras:** Implementar testes automatizados, adotar frameworks frontend e ferramentas de gestão de projeto desde o início. 

---
