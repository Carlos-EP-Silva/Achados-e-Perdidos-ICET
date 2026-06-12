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
    // Só limpa se for a página 1, senão ele apaga os itens anteriores no "Carregar Mais"
    if (paginaAtual === 1) container.innerHTML = '';

    if (lista.length === 0 && paginaAtual === 1) {
        container.innerHTML = '<p class="text-center text-muted">Nenhum item encontrado no momento.</p>';
        return;
    }

    lista.forEach(item => {
        if (item.status !== 'pendente') return;

        const fotoUrl = item.foto ? `${API_URL}/uploads/${item.foto}` : 'https://via.placeholder.com/300x200?text=Sem+Foto';
        const dataFormatada = new Date(item.data_ocorrencia).toLocaleDateString('pt-BR');
        const categoriaItem = item.categoria || 'Outros'; // Prevenção caso o item antigo não tenha categoria

        // Adicionamos a classe 'card-filtro' e o 'data-categoria'
        const card = `
            <div class="col-md-4 col-sm-6 card-filtro" data-categoria="${categoriaItem}">
                <div class="card card-item h-100 position-relative">
                    <span class="badge bg-success status-badge">Encontrado</span>
                    <span class="badge bg-dark position-absolute top-0 start-0 m-2 z-1">${categoriaItem}</span> <img src="${fotoUrl}" class="card-img-top" alt="${item.titulo}">
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

let categoriaSelecionada = '';

function filtrarPorTag(tag) {
    categoriaSelecionada = tag;
    // Opcional: Aqui você pode colocar um código para mudar a cor do botão clicado
    filtrarItens(); 
}

function filtrarItens() {
    const termoBusca = document.getElementById('buscaInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card-filtro'); // Busca todos os cards renderizados
    let itensVisiveis = 0;
    
    cards.forEach(col => {
        const titulo = col.querySelector('.card-title').innerText.toLowerCase();
        const descricao = col.querySelector('.card-text').innerText.toLowerCase();
        const categoriaCard = col.getAttribute('data-categoria'); // Lê a categoria oculta no HTML
        
        // Regra 1: Passa no texto se o termo existir no titulo ou descricao
        const passaTexto = titulo.includes(termoBusca) || descricao.includes(termoBusca);
        
        // Regra 2: Passa na categoria se não tiver nenhuma selecionada ('') ou se for igual
        const passaCategoria = (categoriaSelecionada === '') || (categoriaCard === categoriaSelecionada);
        
        // O card só aparece se passar nas duas regras!
        if (passaTexto && passaCategoria) {
            col.style.display = 'block';
            itensVisiveis++;
        } else {
            col.style.display = 'none';
        }
    });

    // Lógica do Empty State (Estado Vazio) que você já tinha, mantida intacta!
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


let categoriaSelecionada = '';

function filtrarPorTag(tag) {
    categoriaSelecionada = tag;
    
    // CORREÇÃO 1: Limpa a barra de pesquisa para ela não interferir no botão!
    document.getElementById('buscaInput').value = ''; 
    
    filtrarItens(); 
}
function filtrarItens() {
    // Pega o texto, converte para minúsculo e tira os espaços vazios das pontas (trim)
    const termoBusca = document.getElementById('buscaInput').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card-filtro'); 
    let itensVisiveis = 0;
    
    cards.forEach(col => {
        const titulo = col.querySelector('.card-title').innerText.toLowerCase();
        const descricao = col.querySelector('.card-text').innerText.toLowerCase();
        const categoriaCard = col.getAttribute('data-categoria'); 
        
        // CORREÇÃO 2: Só bloqueia o texto se a barra NÃO estiver vazia
        const passaTexto = (termoBusca === '') || titulo.includes(termoBusca) || descricao.includes(termoBusca);
        
        // Regra da Categoria (Se for '' mostra todos)
        const passaCategoria = (categoriaSelecionada === '') || (categoriaCard === categoriaSelecionada);
        
        // O card só aparece se passar no texto E na categoria
        if (passaTexto && passaCategoria) {
            col.style.display = 'block';
            itensVisiveis++;
        } else {
            col.style.display = 'none';
        }
    });

    // --- Lógica do Estado Vazio (Mantida intacta) ---
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