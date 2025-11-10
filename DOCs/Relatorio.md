# 📘 TRABALHO FINAL – DESENVOLVIMENTO WEB

## Sistema: “Achados e Perdidos – ICET/UFAM”

---

### 🏫 Universidade Federal do Amazonas – Instituto de Ciências Exatas e Tecnologia (ICET)
**Curso:** Bacharelado em Sistemas de Informação  
**Disciplina:** Desenvolvimento Web  
**Trabalho Final:** Sistema “Achados e Perdidos – ICET/UFAM”  
**Aluno(s):** Carlos Eduardo [e colega, se houver]  
**Professor:** [Nome do professor]  
**Data de Entrega:** 03/12/2025  
**Local:** Itacoatiara – AM  

---

## 1. Introdução

O projeto **“Achados e Perdidos – ICET/UFAM”** tem como objetivo desenvolver uma aplicação web completa, responsiva e integrada a um banco de dados MySQL, voltada para o gerenciamento de objetos perdidos e encontrados dentro do Instituto de Ciências Exatas e Tecnologia (ICET/UFAM).

O sistema busca **substituir o controle manual atualmente utilizado**, que se baseia em registros em cadernos, por uma plataforma digital moderna e acessível.  
Através dessa aplicação, será possível **registrar itens encontrados**, **reivindicar pertences**, **comunicar-se com o responsável** e **formalizar a devolução**, tudo de forma simples e centralizada.

O trabalho também atende aos requisitos da disciplina, contemplando:

- Interface gráfica e responsiva (desktop, tablet e celular);
- Banco de dados MySQL;
- Múltiplos níveis de acesso (usuário, guarda e administrador);
- Desenvolvimento em camadas (frontend, backend e banco);
- Apresentação dos principais diagramas de modelagem e estrutura do sistema.

---

## 2. Objetivos

### 2.1 Objetivo Geral
Desenvolver um **sistema web funcional** que automatize o processo de controle de achados e perdidos do ICET/UFAM, com autenticação, comunicação interna e registro de devoluções.

### 2.2 Objetivos Específicos

- Implementar um **sistema de login e autenticação** com diferentes perfis de usuário.  
- Criar um **módulo de cadastro e listagem** de itens encontrados.  
- Desenvolver um **fluxo de reivindicação e devolução** de objetos.  
- Implementar um **chat interno** entre o usuário e o guarda.  
- Integrar o sistema ao **banco de dados MySQL**.  
- Garantir que o sistema seja **responsivo** e acessível via navegador e dispositivos móveis.  
- Utilizar boas práticas de **desenvolvimento web**, incluindo rotas, CRUD, e manipulação de dados no backend.

---

## 3. Tecnologias Utilizadas

| Camada | Tecnologia | Descrição |
|:-------|:------------|:-----------|
| **Frontend** | HTML5, CSS3, JavaScript (ou React.js) | Criação da interface responsiva e dinâmica. |
| **Backend** | Node.js (Express) ou PHP (Laravel) | Processamento das requisições, autenticação e controle de acesso. |
| **Banco de Dados** | MySQL | Armazenamento de usuários, itens, mensagens e registros de devolução. |
| **Servidor** | XAMPP / Node Server | Ambiente de execução local e futura implantação. |
| **Controle de Versão** | GitHub | Armazenamento do código-fonte e versionamento do sistema. |

---

## 4. Metodologia de Desenvolvimento

O sistema foi desenvolvido com base no **modelo de desenvolvimento iterativo e incremental**, adotando princípios do **modelo em espiral** para garantir a validação contínua das funcionalidades.

As etapas foram organizadas da seguinte forma:

1. **Planejamento e Definição do Escopo:**  
   Definição das funcionalidades principais e papéis de usuário.

2. **Prototipação de Interfaces:**  
   Criação das telas principais no Figma e validação com o cliente (professor).

3. **Desenvolvimento Incremental:**  
   Cada módulo (segurança, comunicação, devolução) foi implementado e testado separadamente.

4. **Integração com Banco de Dados:**  
   Criação das tabelas no MySQL e integração via backend.

5. **Testes e Ajustes:**  
   Verificação de responsividade, validação de formulários e autenticação de usuários.

6. **Entrega e Documentação:**  
   Elaboração da documentação técnica e acadêmica com os diagramas, protótipos e descrição do produto final.

---

## 5. Estrutura do Sistema

O sistema foi dividido em três **módulos principais**, conforme exigência da disciplina:

| Módulo | Função | Implementação |
|:--------|:--------|:---------------|
| **Segurança** | Controle de autenticação e autorização. | Login com níveis de acesso (usuário, guarda, administrador). |
| **Comunicação** | Canal de troca de mensagens entre usuários e guarda. | Chat interno vinculado à reivindicação de um item. |
| **Transação (Devolução)** | Registro da devolução e finalização do processo. | Atualização de status do item para “Devolvido” no banco. |

---

## 6. Perfis de Usuário

| Perfil | Descrição | Permissões |
|:--------|:-----------|:------------|
| **Usuário Comum (Aluno/Visitante)** | Pessoa que perdeu um item. | Cadastrar-se, visualizar itens, reivindicar, trocar mensagens. |
| **Guarda (Funcionário)** | Responsável por registrar e devolver itens. | Cadastrar itens, aprovar reivindicações, marcar devoluções. |
| **Administrador** | Gestor do sistema. | Gerenciar contas, permissões e manutenção geral. |

---

## 7. Requisitos Funcionais

| Código | Descrição |
|:--------|:------------|
| **RF-01** | O sistema deve permitir o cadastro e login de usuários. |
| **RF-02** | O sistema deve diferenciar permissões de acesso. |
| **RF-03** | O guarda deve cadastrar itens achados com informações completas. |
| **RF-04** | O usuário deve visualizar itens disponíveis. |
| **RF-05** | O usuário deve poder reivindicar um item. |
| **RF-06** | O guarda deve aprovar, negar e registrar devoluções. |
| **RF-07** | O sistema deve permitir troca de mensagens entre usuário e guarda. |
| **RF-08** | Itens devolvidos devem sair da listagem pública. |

---

## 8. Requisitos Não Funcionais

| Código | Descrição |
|:--------|:------------|
| **RNF-01** | A aplicação deve ser web responsiva (desktop e mobile). |
| **RNF-02** | O sistema deve utilizar banco de dados MySQL. |
| **RNF-03** | O backend deve garantir segurança e autenticação. |
| **RNF-04** | A interface deve ser intuitiva e de fácil uso. |
| **RNF-05** | O sistema deve ter desempenho satisfatório e respostas rápidas. |
| **RNF-06** | O código deve seguir boas práticas de desenvolvimento web. |

---

## 9. Próximos Passos

As próximas etapas de documentação e entrega incluem:

1. **Diagramas UML:**  
   Casos de uso, classes, sequência e atividades.

2. **Modelo Lógico do Banco de Dados (DER).**

3. **Descrição dos Protótipos de Tela (Figma).**

4. **Registro das Entrevistas e Iterações.**

5. **Conclusão e Reflexão sobre o Aprendizado.**

