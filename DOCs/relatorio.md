# SISTEMA ACHADOS & PERDIDOS - ICET/UFAM

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
O Sistema "Achados & Perdidos - ICET/UFAM" é uma aplicação web desenvolvida para modernizar o processo de gestão de objetos perdidos e encontrados no Instituto de Ciências Exatas e Tecnologia da UFAM.

### 1.2 Justificativa da Escolha
A escolha baseou-se na necessidade real de substituir o sistema manual atual (cadernos de registro) por uma solução digital que ofereça maior eficiência, transparência e acessibilidade.

### 1.3 Objetivo Geral
Desenvolver uma aplicação web completa para gestão de achados e perdidos no ICET/UFAM, integrada a banco de dados MySQL e com interface responsiva.

### 1.4 Objetivos Específicos
* Implementar sistema de autenticação com três níveis de acesso.
* Desenvolver módulo de cadastro e gestão de itens (acervo).
* Criar fluxo completo de reivindicação (online) e devolução (presencial).

### 1.5 Escopo Definido
**Módulos Implementados:**
* Módulo de Segurança (autenticação JWT e autorização).
* Módulo de Transação (processo de reivindicação, baixa e histórico).

**Funcionalidades Principais:**
* Cadastro e login de usuários.
* Gestão de itens encontrados (apenas guardas).
* Sistema de reivindicações e aprovação.
* Painéis administrativos e relatórios.

---

## 2. Metodologia Utilizada

### 2.1 Modelo em Espiral Adotado
Adotou-se o modelo em espiral por sua adequação a projetos com requisitos evolutivos, permitindo validações constantes e redução de riscos através de ciclos iterativos.

### 2.2 Prototipação Evolutiva
Utilizou-se prototipação evolutiva, onde cada versão do protótipo incorporou novas funcionalidades baseadas nas validações realizadas com o cliente.

### 2.3 Iterações Realizadas
* **Iteração 1 (1 semanas):** Levantamento de requisitos e diagramas UML iniciais.
* **Iteração 2 (1 semanas):** Desenvolvimento do módulo de segurança e protótipos.
* **Iteração 3 (1 semanas):** Implementação dos módulos principais e frontend.
* **Iteração 4 (1 semanas):** Testes, validações finais e documentação.

### 2.3 Consultas ao Cliente
Realizaram-se reuniões com o professor para:
* Validação dos protótipos.
* Revisão dos diagramas UML.
* Demonstração das funcionalidades implementadas.
* Ajustes baseados no feedback recebido.

---

## 3. Registro das Entrevistas com o Cliente

**Entrevista 1**
* **Data:** 19/11/2025 
* **Assuntos:** Definição do escopo, validação de requisitos iniciais, tecnologias.
* **Decisões:** Sistema web com três níveis de acesso, BD MySQL obrigatório, Interface responsiva.

**Entrevista 2**
* **Data:** 26/11/2025
* **Assuntos:** Revisão de casos de uso, validação de protótipo de baixa fidelidade, fluxos principais.
* **Decisões:** Aprovação de diagramas, validação do fluxo de reivindicação, definição de perfis.

**Entrevista 3**
* **Data:** 01/12/2025
* **Assuntos:** Protótipo funcional, modelagem do banco de dados, módulo de segurança.
* **Decisões:** Aprovação da arquitetura, validação do DER, confirmação de tecnologias.

**Entrevista 4**
* **Data:** 03/12/2025
* **Assuntos:** Apresentação do sistema, validação da responsividade, revisão de casos de teste.
* **Decisões:** Aprovação da interface, validação dos fluxos completos, confirmação de requisitos.

---

## 4. Registro do Tempo Investido

| Atividade | Horas Investidas |
| :--- | :--- |
| **Planejamento e Requisitos** | 3h |
| **Diagramas UML** | 6h |
| **Prototipação** | 2h |
| **Banco de Dados** (Modelagem e MySQL) | 6h |
| **Frontend Responsivo** (Desktop, tablet e mobile) | 12h |
| **Testes e Validação** | 2h |
| **Documentação** | 8h |
| **TOTAL GERAL** | **37h** |

---

## 5. Levantamento de Requisitos 

### 5.1 Requisitos Funcionais

| ID | Descrição | Ator Principal |
| :--- | :--- | :--- |
| **RF01** | **Autenticação:** Permitir cadastro de usuários e login seguro. | Todos |
| **RF02** | **Cadastrar Item Encontrado:** O Guarda registra um item achado no campus (título, foto, local e data). | Guarda |
| **RF03** | **Consultar Acervo:** Visualizar itens disponíveis na tela inicial com busca por nome. | Todos |
| **RF04** | **Reivindicar Item (Online):** O usuário logado sinaliza que um item listado é seu (gera pendência). | Usuário |
| **RF05** | **Gerenciar Pendências:** O Guarda aprova ou recusa as solicitações de reivindicação. | Guarda |
| **RF06** | **Registrar Baixa Presencial:** O Guarda registra a entrega direta no balcão, informando os dados do recebedor (Nome/Doc/Contato). | Guarda |
| **RF07** | **Gerenciar Guardas:** O Admin cadastra novos guardas e desativa acessos. | Admin |
| **RF08** | **Dashboard e Relatórios:** Visualizar estatísticas e histórico de devoluções. | Admin |
| **RF09** | **Compartilhar:** Permite compartilhar o link de um item encontrado em redes sociais ou copiar o link. | Todos |

### 5.2 Requisitos Não-Funcionais

| ID | Descrição |
| :--- | :--- |
| **RNF-01** | **Responsividade:** A aplicação deve utilizar Bootstrap 5 para funcionar em desktop e mobile. |
| **RNF-02** | **Persistência:** O sistema deve utilizar banco de dados relacional MySQL. |
| **RNF-03** | **Segurança:** O backend deve utilizar JWT para sessão e Bcrypt para senhas. |
| **RNF-04** | **Usabilidade:** A interface deve ser intuitiva, com feedbacks visuais de sucesso/erro. |
| **RNF-05** | **Controle de Acesso:** Implementação rigorosa de três níveis (Usuario, Guarda, Admin). |
| **RNF-06** | **Upload:** O sistema deve permitir o envio e armazenamento de fotos dos itens (até 5MB). |

### 5.3 Regras de Negócio (RN)

| ID | Descrição |
| :--- | :--- |
| **RN01** | **Unidirecionalidade:** Usuários comuns **não** cadastram itens. Apenas a equipe (Guardas) alimenta o sistema para garantir a veracidade. |
| **RN02** | **Privacidade:** Usuários comuns não podem visualizar dados sensíveis (documento/contato) de outros usuários ou do histórico de devoluções. |
| **RN03** | **Histórico:** Guardas e Itens devolvidos não são excluídos fisicamente, apenas marcados como inativos/devolvidos (Soft Delete). |
| **RN04** | **Requisito de Entrega:** É obrigatório informar o documento (RG/CPF) de quem recebe o item para dar baixa no sistema. |

### 5.4 Atores do Sistema e Níveis de Acesso

* **Usuário Comum (Aluno/Visitante):**
    * Visualizar itens achados (vitrine).
    * Solicitar reivindicação ("É meu").
    * Compartilhar itens.
    * Gerenciar próprio perfil.

* **Guarda (Funcionário):**
    * Todas as funções do usuário.
    * **Cadastrar itens encontrados.**
    * Analisar pendências (Aceitar/Recusar).
    * Realizar baixa presencial.

* **Administrador:**
    * Todas as funções do guarda.
    * Gerenciar equipe (Cadastrar/Desativar Guardas).
    * Visualizar Dashboard e Relatórios Gerenciais.

## 6. Diagramas UML 

Esta seção descreve a estrutura dos diagramas projetados.

### 6.1 Diagrama de Casos de Uso
Mapeia as interações entre Usuário, Guarda e Administrador com as funcionalidades principais (Login, Cadastro, Reivindicação, etc.).
![Caso](https://drive.google.com/uc?export=download&id=1jrSOp7JmnYMAZ0zEnuLDqNCLk7U9EG5z)

---

### 6.2 Diagrama de Classes (Principais Classes)
![Classe](https://drive.google.com/uc?export=view&id=1mcgaaldWE6Lt8aH0ecfnBP_MD4_d-EWk)

---

### 6.3 Diagramas de Sequência 
![Sequencia](https://drive.google.com/uc?export=view&id=1qTQ5DW1jdJKA0B3uetDGKVwSmJAd40ao)

---

### 6.4 Diagrama de Atividades 
![Atividades](https://drive.google.com/uc?export=view&id=1gB82Jw4fSPS3qtIxsWAsj0a_FYJA7VOv)

---

### 6.5 Diagrama de Estados 
![Estados](https://drive.google.com/uc?export=view&id=1n8sowKsMmwPIAeooim-CvO_gKwwJYfkS)

---

### 6.6 Diagrama de Componentes
![Componentes](https://drive.google.com/uc?export=view&id=1mVcriJjuDyEclR_tDjifsVgVs-RcJvRC)

---

### 6.7 Diagrama de Banco de Dados (DER)
![DER](https://drive.google.com/uc?export=view&id=1iIoOLAmy5iQ3M-_9Ngb337PkonmvBkoI)

---

![der](https://drive.google.com/uc?export=view&id=1VEtHBzf4A91CsB35vPXg9eWTVnklrFL5)

---

## 7. Protótipos de Telas 

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
