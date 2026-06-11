// main.js
const API_URL = 'https://achados-e-perdidos-icet.onrender.com';
let usuarioLogado = null;

// Ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    verificarLogin();
   carregarItens(true);
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

function filtrarItens(termoForcado = null) {
    const termo = (termoForcado !== null ? termoForcado : document.getElementById('buscaInput').value).toLowerCase();
    const cards = document.querySelectorAll('.col-md-4');
    let itensVisiveis = 0;
    
    cards.forEach(col => {
        const titulo = col.querySelector('.card-title').innerText.toLowerCase();
        const descricao = col.querySelector('.card-text').innerText.toLowerCase();
        
        // Procura tanto no título quanto na descrição
        if (titulo.includes(termo) || descricao.includes(termo)) {
            col.style.display = 'block';
            itensVisiveis++;
        } else {
            col.style.display = 'none';
        }
    });

    // Lógica do Empty State (Estado Vazio)
    let container = document.getElementById('lista-itens');
    let msgVazia = document.getElementById('empty-state-msg');

    if (itensVisiveis === 0) {
        if (!msgVazia) {
            msgVazia = document.createElement('div');
            msgVazia.id = 'empty-state-msg';
            msgVazia.className = 'col-12 text-center py-5';
            msgVazia.innerHTML = `
                <i class="bi bi-inbox text-muted" style="font-size: 4rem;"></i>
                <h4 class="text-muted mt-3">Nenhum item encontrado</h4>
                <p class="text-muted small">Tente procurar por palavras mais simples ou navegue pelas categorias.</p>
            `;
            container.appendChild(msgVazia);
        } else {
            msgVazia.style.display = 'block';
        }
    } else if (msgVazia) {
        msgVazia.style.display = 'none';
    }
}

function filtrarPorTag(tag) {
    document.getElementById('buscaInput').value = tag;
    filtrarItens(tag);
}

// Função para disparar a notificação na tela sem usar alert()
function showToast(mensagem, tipo = 'success') {
    const toastEl = document.getElementById('liveToast');
    const toastMsg = document.getElementById('toastMessage');
    
    if (toastEl && toastMsg) {
        toastMsg.innerText = mensagem;
        
        // Remove cores antigas e aplica a nova baseada no sucesso/erro
        toastEl.classList.remove('bg-success', 'bg-danger', 'bg-warning');
        
        if (tipo === 'success') toastEl.classList.add('bg-success');
        if (tipo === 'error') toastEl.classList.add('bg-danger');
        if (tipo === 'warning') toastEl.classList.add('bg-warning', 'text-dark');

        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    } else {
        // Fallback caso a página não tenha o container HTML do toast
        alert(mensagem); 
    }
}

function compartilharItem(titulo) {
    const texto = `Encontraram este item no ICET/UFAM: *${titulo}*. É de alguém? Confere lá no sistema!`;
    const urlCorrente = window.location.href;
    
    // Cria o link da API do WhatsApp
    const linkWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto + ' ' + urlCorrente)}`;
    
    // Abre em uma nova aba
    window.open(linkWhatsApp, '_blank');
}

// Lógica de Modo Escuro
document.addEventListener('DOMContentLoaded', () => {
    // Ao carregar, verifica se o usuário já preferia o modo escuro antes
    const temaSalvo = localStorage.getItem('tema_icet');
    if (temaSalvo === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        atualizarIconeTema('dark');
    }
});

function alternarTema() {
    const temaAtual = document.documentElement.getAttribute('data-bs-theme');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-bs-theme', novoTema);
    localStorage.setItem('tema_icet', novoTema);
    atualizarIconeTema(novoTema);
}

function atualizarIconeTema(tema) {
    const btn = document.getElementById('btn-tema');
    if (!btn) return;
    
    if (tema === 'dark') {
        btn.innerHTML = '<i class="bi bi-sun-fill text-warning"></i>';
        btn.classList.remove('btn-outline-light');
        btn.classList.add('btn-outline-warning');
    } else {
        btn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
        btn.classList.remove('btn-outline-warning');
        btn.classList.add('btn-outline-light');
    }
}
let paginaAtual = 1;
const limitePorPagina = 6;
async function carregarItens(reiniciar = false) {
    if (reiniciar) {
        paginaAtual = 1;
        document.getElementById('lista-itens').innerHTML = ''; // Limpa a tela
    }

    try {
        // Envia qual página queremos buscar
        const res = await fetch(`${API_URL}/itens?page=${paginaAtual}&limit=${limitePorPagina}`);
        const itens = await res.json();
        
        renderizarItens(itens);

        // Lógica do botão "Carregar Mais"
        let containerBtn = document.getElementById('container-btn-mais');
        
        // Se vieram itens preenchendo o limite, significa que pode haver mais.
        if (itens.length === limitePorPagina) {
            if (!containerBtn) {
                containerBtn = document.createElement('div');
                containerBtn.id = 'container-btn-mais';
                containerBtn.className = 'text-center mt-4 col-12';
                containerBtn.innerHTML = `<button class="btn btn-outline-success rounded-pill px-4" onclick="carregarMaisItens()"><i class="bi bi-arrow-down-circle"></i> Carregar Mais</button>`;
                document.getElementById('lista-itens').appendChild(containerBtn);
            }
        } else if (containerBtn) {
            // Se vieram menos itens, acabaram os resultados. Remove o botão.
            containerBtn.remove();
        }

    } catch (error) {
        console.error('Erro:', error);
    }
}

function carregarMaisItens() {
    paginaAtual++;
    // Remove o botão atual antes de carregar os próximos
    const btn = document.getElementById('container-btn-mais');
    if (btn) btn.remove();
    carregarItens(false);
}