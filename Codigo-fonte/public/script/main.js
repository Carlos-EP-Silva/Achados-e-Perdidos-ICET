// main.js
const API_URL = 'http://localhost:3000';
let usuarioLogado = null;

// Ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    verificarLogin();
    carregarItens();
});

function verificarLogin() {
    const userStr = localStorage.getItem('usuario');
    const menuNav = document.getElementById('menu-nav');

    if (userStr) {
    usuarioLogado = JSON.parse(userStr);
    menuNav.innerHTML = `
        <li class="nav-item me-3">
            <span class="text-white">Olá, ${usuarioLogado.nome.split(' ')[0]}</span>
        </li>
        <li class="nav-item">
            <a href="perfil.html" class="btn btn-outline-light btn-sm me-2">Meu Perfil</a>
        </li>
        ${usuarioLogado.tipo === 'guarda' || usuarioLogado.tipo === 'admin' ? 
            '<li class="nav-item"><a href="guarda.html" class="btn btn-warning btn-sm me-2">Área do Guarda</a></li>' : ''}
        <li class="nav-item"><button onclick="logout()" class="btn btn-danger btn-sm">Sair</button></li>
    `;

    } else {
        // Menu para Visitante
        menuNav.innerHTML = `
            <li class="nav-item"><a href="login.html" class="nav-link text-white">Entrar</a></li>
            <li class="nav-item"><a href="cadastro.html" class="btn btn-light text-success btn-sm ms-2">Criar Conta</a></li>
        `;
    }
}

async function carregarItens() {
    try {
        const res = await fetch(`${API_URL}/itens`);
        const itens = await res.json();
        renderizarItens(itens);
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
        document.getElementById('lista-itens').innerHTML = '<p class="text-danger text-center">Erro ao carregar itens. O servidor está rodando?</p>';
    }
}

function renderizarItens(lista) {
    const container = document.getElementById('lista-itens');
    container.innerHTML = '';

    if (lista.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Nenhum item encontrado no momento.</p>';
        return;
    }

    lista.forEach(item => {
        // Só mostra itens Pendentes (não mostra devolvidos)
        if (item.status !== 'pendente') return;

        // Se não tiver foto, usa uma padrão
        const fotoUrl = item.foto ? `${API_URL}/uploads/${item.foto}` : 'https://via.placeholder.com/300x200?text=Sem+Foto';
        
        // Formata data
        const dataFormatada = new Date(item.data_ocorrencia).toLocaleDateString('pt-BR');

        const card = `
            <div class="col-md-4 col-sm-6">
                <div class="card card-item h-100">
                    <span class="badge bg-success status-badge">Encontrado</span>
                    <img src="${fotoUrl}" class="card-img-top" alt="${item.titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${item.titulo}</h5>
                        <p class="card-text text-muted small"><i class="bi bi-geo-alt-fill"></i> ${item.local_ocorrencia}</p>
                        <p class="card-text text-truncate">${item.descricao}</p>
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <small class="text-muted">${dataFormatada}</small>
                            <button onclick="tentarReivindicar(${item.id})" class="btn btn-outline-success btn-sm">
                                É meu!
                            </button>
                        </div>
                         <button onclick="compartilharItem('${item.titulo}')" class="btn btn-link btn-sm text-decoration-none mt-2">
                            <i class="bi bi-share"></i> Compartilhar
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

function tentarReivindicar(idItem) {
    if (!usuarioLogado) {
        alert('Você precisa fazer login para reivindicar um item!');
        window.location.href = 'login.html';
        return;
    }

    // Abre modal e salva o ID
    document.getElementById('idItemReivindicar').value = idItem;
    const modal = new bootstrap.Modal(document.getElementById('modalReivindicar'));
    modal.show();
}

async function enviarReivindicacao() {
    const itemId = document.getElementById('idItemReivindicar').value;
    
    try {
        const res = await fetch(`${API_URL}/reivindicacoes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                item_id: itemId,
                usuario_id: usuarioLogado.id
            })
        });

        const data = await res.json();

        if (res.ok) {
            alert('Solicitação enviada! Aguarde o contato do guarda.');
            location.reload(); // Recarrega para atualizar status
        } else {
            alert('Erro: ' + data.message);
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao conectar com servidor.');
    }
}

function compartilharItem(titulo) {
    if (navigator.share) {
        navigator.share({
            title: 'Achados e Perdidos UFAM',
            text: `Olha esse item encontrado: ${titulo}`,
            url: window.location.href
        }).catch(console.error);
    } else {
        alert('Link copiado para área de transferência!');
        navigator.clipboard.writeText(window.location.href);
    }
}

function logout() {
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}

function filtrarItens() {
    const termo = document.getElementById('buscaInput').value.toLowerCase();
    const cards = document.querySelectorAll('.col-md-4');
    
    cards.forEach(col => {
        const titulo = col.querySelector('.card-title').innerText.toLowerCase();
        if (titulo.includes(termo)) {
            col.style.display = 'block';
        } else {
            col.style.display = 'none';
        }
    });
}