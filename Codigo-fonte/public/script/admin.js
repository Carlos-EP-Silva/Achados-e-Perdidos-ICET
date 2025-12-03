// script/admin.js
const API_URL = 'http://localhost:3000';

// Ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    verificarAdmin();    // 1. Segurança
    carregarDashboard(); // 2. Números
    carregarGuardas();   // 3. Equipe
});

// --- SEGURANÇA E UTILITÁRIOS ---

function verificarAdmin() {
    const userStr = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');

    // Se não tem usuário OU não tem token, tchau
    if (!userStr || !token) {
        window.location.href = 'index.html';
        return;
    }

    const usuario = JSON.parse(userStr);
    
    // Verificação dupla (Frontend)
    if (usuario.tipo !== 'admin') {
        alert('Acesso restrito a administradores.');
        window.location.href = 'index.html';
    }
}

// Helper para gerar o Header de segurança em todas as requisições
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // O padrão ouro de segurança
    };
}

function logout() {
    if(confirm("Deseja realmente sair do painel?")) {
        localStorage.clear(); // Limpa tudo (token e user)
        window.location.href = 'index.html';
    }
}

// --- DASHBOARD (ESTATÍSTICAS) ---

async function carregarDashboard() {
    try {
        const resp = await fetch(`${API_URL}/admin/dados`, {
            headers: getAuthHeaders() // Usa o token JWT
        });

        // Se o token for inválido ou expirado (Erro 401 ou 403)
        if (resp.status === 401 || resp.status === 403) {
            alert('Sessão expirada. Faça login novamente.');
            localStorage.clear();
            window.location.href = 'login.html';
            return;
        }

        const dados = await resp.json();

        // Atualiza os contadores
        document.getElementById("total-itens").textContent = dados.totalItens || 0;
        document.getElementById("itens-reivindicados").textContent = dados.itensReivindicados || 0;
        document.getElementById("reivind-pendentes").textContent = dados.reivindPendentes || 0;
        document.getElementById("guardas-ativos").textContent = dados.guardasAtivos || 0;

        // Tabela: Itens Recentes
        preencherTabelaItens(dados.itensRecentes);

        // Tabela: Reivindicações Recentes
        preencherTabelaReivindicacoes(dados.reivindicacoesPendentes);

    } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
    }
}

function preencherTabelaItens(lista) {
    const tbody = document.getElementById("tbody-itens-recentes");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (!lista || lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="text-center text-muted">Sem dados recentes</td></tr>';
        return;
    }

    lista.forEach((item) => {
        let badgeClass = 'bg-secondary';
        if (item.status === 'pendente') badgeClass = 'bg-primary';
        if (item.status === 'devolvido') badgeClass = 'bg-success';
        if (item.status === 'reivindicado') badgeClass = 'bg-warning text-dark';

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.item}</td>
            <td><small>${item.local}</small></td>
            <td><span class="badge ${badgeClass}">${item.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function preencherTabelaReivindicacoes(lista) {
    const tbody = document.getElementById("tbody-reivindicacoes-pendentes");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (!lista || lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="text-center text-muted">Nenhuma pendência</td></tr>';
        return;
    }

    lista.forEach((r) => {
        const dataFormatada = new Date(r.data).toLocaleDateString("pt-BR");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${r.item}</td>
            <td>${r.usuario}</td>
            <td><small>${dataFormatada}</small></td>
        `;
        tbody.appendChild(tr);
    });
}

// --- GESTÃO DE GUARDAS ---

async function carregarGuardas() {
    const tbody = document.getElementById('tbody-guardas');
    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="4" class="text-center">Carregando...</td></tr>';

    try {
        const res = await fetch(`${API_URL}/admin/guardas`, {
            headers: getAuthHeaders()
        });
        
        const guardas = await res.json();

        tbody.innerHTML = '';
        if (guardas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center">Nenhum guarda cadastrado.</td></tr>';
            return;
        }

        guardas.forEach(g => {
            // Verifica status (o banco retorna 1 ou 0)
            // Se g.ativo for 1 (true), badge verde. Se 0 (false), badge vermelha.
            const statusBadge = g.ativo 
                ? '<span class="badge bg-success">Ativo</span>' 
                : '<span class="badge bg-danger">Inativo</span>';

            const btnDesativar = g.ativo 
                ? `<button class="btn btn-sm btn-outline-danger" onclick="removerGuarda(${g.id})">
                     <i class="bi bi-person-x"></i> Desativar
                   </button>`
                : `<button class="btn btn-sm btn-outline-secondary" disabled>Desativado</button>`;

            tbody.innerHTML += `
                <tr>
                    <td>${g.nome}</td>
                    <td>${g.email}</td>
                    <td>${statusBadge}</td>
                    <td>${btnDesativar}</td>
                </tr>
            `;
        });
    } catch (err) {
        console.error(err);
        tbody.innerHTML = '<tr><td colspan="4" class="text-danger text-center">Erro ao carregar lista.</td></tr>';
    }
}

// Cadastro de Guarda
const formGuarda = document.getElementById('formGuarda');
if (formGuarda) {
    formGuarda.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('gNome').value;
        const email = document.getElementById('gEmail').value;
        const senha = document.getElementById('gSenha').value;

        // Feedback visual
        const btn = formGuarda.querySelector('button[type="submit"]');
        const txtOriginal = btn.innerText;
        btn.innerText = "Salvando...";
        btn.disabled = true;

        try {
            const res = await fetch(`${API_URL}/admin/guardas`, {
                method: 'POST',
                headers: getAuthHeaders(), // Header JWT
                body: JSON.stringify({ nome, email, senha })
            });

            const data = await res.json();

            if (res.ok) {
                alert('Guarda cadastrado com sucesso!');
                location.reload(); 
            } else {
                alert('Erro: ' + (data.message || 'Falha ao criar'));
            }
        } catch (err) {
            console.error(err);
            alert('Erro de conexão.');
        } finally {
            btn.innerText = txtOriginal;
            btn.disabled = false;
        }
    });
}

// Remover (Desativar) Guarda
async function removerGuarda(id) {
    if (!confirm('Tem certeza que deseja desativar o acesso deste guarda?')) return;

    try {
        const res = await fetch(`${API_URL}/admin/guardas/${id}`, { 
            method: 'DELETE',
            headers: getAuthHeaders() // Header JWT
        });

        if (res.ok) {
            carregarGuardas(); // Recarrega tabela
            carregarDashboard(); // Atualiza contador
        } else {
            alert('Erro ao desativar guarda.');
        }
    } catch (err) {
        console.error(err);
        alert('Erro de conexão.');
    }
}

async function carregarRelatorio() {
    const tbody = document.querySelector("#tabela-relatorio tbody");
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">Gerando...</td></tr>';

    try {
        const res = await fetch(`${API_URL}/admin/relatorio`, {
            headers: getAuthHeaders()
        });
        const dados = await res.json();

        tbody.innerHTML = '';
        if(dados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum registro encontrado.</td></tr>';
            return;
        }

        dados.forEach(d => {
            const data = new Date(d.data_devolucao).toLocaleString('pt-BR');
            tbody.innerHTML += `
                <tr>
                    <td>${data}</td>
                    <td>${d.item}</td>
                    <td>${d.guarda_responsavel}</td>
                    <td>${d.recebido_por || 'N/A'}</td>
                    <td>${d.documento_recebedor}</td>
                </tr>
            `;
        });
    } catch (err) {
        console.error(err);
        alert('Erro ao carregar relatório');
    }
}