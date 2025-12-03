// guarda.js
const API_URL = 'http://localhost:3000';
let usuarioLogado = null;
let modalDevolucao = null; // Instância global do modal
let modalBaixa = null;     // Instância global do modal presencial

// 1. Verificação de Segurança ao carregar
document.addEventListener('DOMContentLoaded', () => {
    verificarAcesso();
    
    // Se passou da verificação, atualiza o nome
    const elNome = document.getElementById('nomeGuarda');
    if(elNome && usuarioLogado) {
        elNome.innerText = `Guarda: ${usuarioLogado.nome}`;
    }

    // Inicializa modais do Bootstrap
    const elModalDev = document.getElementById('modalDevolucao');
    if(elModalDev) modalDevolucao = new bootstrap.Modal(elModalDev);

    const elModalBaixa = document.getElementById('modalBaixaPresencial');
    if(elModalBaixa) modalBaixa = new bootstrap.Modal(elModalBaixa);
});

function verificarAcesso() {
    const userStr = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');

    if (!userStr || !token) {
        logout(false);
        return;
    }

    usuarioLogado = JSON.parse(userStr);

    if (usuarioLogado.tipo !== 'guarda' && usuarioLogado.tipo !== 'admin') {
        alert('Acesso negado.');
        window.location.href = 'index.html';
    }
}

// Tornar a função logout acessível globalmente (para o botão funcionar)
window.logout = function(confirmar = true) {
    if (confirmar && !confirm("Deseja realmente sair?")) return;
    localStorage.clear();
    window.location.href = 'index.html';
}

// 2. Lógica de Cadastrar Item
const formItem = document.getElementById('formItem');
if (formItem) {
    formItem.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = formItem.querySelector('button[type="submit"]');
        const txtOriginal = btn.innerHTML;
        btn.innerHTML = 'Salvando...';
        btn.disabled = true;

        const formData = new FormData(formItem);
        formData.append('usuario_id', usuarioLogado.id); 

        try {
            const res = await fetch(`${API_URL}/itens`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: formData
            });

            const data = await res.json();

            if (res.ok) {
                alert('Item cadastrado com sucesso!');
                formItem.reset();
            } else {
                alert('Erro: ' + (data.message || 'Falha ao cadastrar'));
            }
        } catch (error) {
            console.error(error);
            alert('Erro de conexão.');
        } finally {
            btn.innerHTML = txtOriginal;
            btn.disabled = false;
        }
    });
}

// 3. Carregar Pendências (Aba 2)
window.carregarPendencias = async function() {
    const tbody = document.getElementById('tabela-pendencias');
    const msg = document.getElementById('msg-sem-pendencias');
    
    if(!tbody) return;
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">Carregando...</td></tr>';
    if(msg) msg.classList.add('d-none');

    try {
        const res = await fetch(`${API_URL}/guarda/pendencias`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        if (!res.ok) throw new Error('Erro na requisição');

        const lista = await res.json();
        tbody.innerHTML = '';

        if (lista.length === 0) {
            if(msg) msg.classList.remove('d-none');
            return;
        }

        lista.forEach(p => {
            const dataF = new Date(p.data_solicitacao).toLocaleDateString('pt-BR');
            const fotoUrl = p.foto ? `${API_URL}/uploads/${p.foto}` : 'https://via.placeholder.com/50?text=Foto';

            tbody.innerHTML += `
                <tr>
                    <td>${p.nome_item}</td>
                    <td>${p.nome_usuario}</td>
                    <td>${dataF}</td>
                    <td><img src="${fotoUrl}" width="50" height="50" class="object-fit-cover rounded"></td>
                    <td>
                        <button class="btn btn-success btn-sm" onclick="abrirModal(${p.id}, ${p.item_id})">
                            <i class="bi bi-check-lg"></i> Aceitar
                        </button>
                        <button class="btn btn-danger btn-sm ms-1" onclick="recusarItem(${p.id}, ${p.item_id})">
                            <i class="bi bi-x-lg"></i> Negar
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error(error);
        tbody.innerHTML = '<tr><td colspan="5" class="text-danger text-center">Erro ao carregar.</td></tr>';
    }
}

// 4. Lógica de Aprovar/Devolver (Online)
window.abrirModal = function(reivindicacaoId, itemId) {
    document.getElementById('hiddenReivId').value = reivindicacaoId;
    document.getElementById('hiddenItemId').value = itemId;
    document.getElementById('docRecebedor').value = ''; 
    modalDevolucao.show();
}

window.confirmarBaixa = async function() {
    const doc = document.getElementById('docRecebedor').value;
    const rId = document.getElementById('hiddenReivId').value;
    const iId = document.getElementById('hiddenItemId').value;

    if (!doc) return alert('Informe o documento.');

    try {
        const res = await fetch(`${API_URL}/guarda/devolver`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                reivindicacao_id: rId,
                item_id: iId,
                guarda_id: usuarioLogado.id,
                documento_recebedor: doc
            })
        });

        if (res.ok) {
            alert('Devolução registrada!');
            modalDevolucao.hide();
            carregarPendencias();
        } else {
            alert('Erro ao registrar.');
        }
    } catch (error) {
        console.error(error);
    }
}

// 5. Lógica de Recusar
window.recusarItem = async function(reivId, itemId) {
    if(!confirm("Deseja NEGAR este pedido? O item voltará a ficar disponível.")) return;

    try {
        const res = await fetch(`${API_URL}/guarda/recusar`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({ reivindicacao_id: reivId, item_id: itemId })
        });
        if(res.ok) {
            alert('Pedido recusado.');
            carregarPendencias();
        }
    } catch(err) {
        console.error(err);
        alert('Erro ao recusar.');
    }
}

// 6. Carregar Acervo (Aba 3 - Baixa Presencial)
// Função chamada ao clicar na aba "Baixa Presencial"
window.carregarAcervo = async function() {
    const tbody = document.getElementById('tbody-acervo');
    if(!tbody) return; // Se não achar a tabela, para.
    
    tbody.innerHTML = '<tr><td colspan="4" class="text-center"><div class="spinner-border spinner-border-sm text-success"></div> Carregando acervo...</td></tr>';

    try {
        // Busca itens que estão pendentes ou reivindicados (ainda no acervo físico)
        const res = await fetch(`${API_URL}/guarda/acervo`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        
        const lista = await res.json();
        
        tbody.innerHTML = ''; // Limpa o carregando

        if(lista.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Nenhum item físico disponível no momento.</td></tr>';
            return;
        }

        // Monta a lista
        lista.forEach(item => {
            const dataF = new Date(item.data_ocorrencia).toLocaleDateString('pt-BR');
            // Botão que abre o modal já passando o ID do item selecionado
            const btnEntregar = `
                <button class="btn btn-outline-dark btn-sm" onclick="abrirModalBaixa(${item.id})">
                    <i class="bi bi-hand-index-thumb"></i> Selecionar
                </button>
            `;

            tbody.innerHTML += `
                <tr>
                    <td>
                        <span class="fw-bold text-success">${item.titulo}</span><br>
                        <small class="text-muted">${item.descricao || ''}</small>
                    </td>
                    <td>${item.local_ocorrencia}</td>
                    <td>${dataF}</td>
                    <td class="text-center">${btnEntregar}</td>
                </tr>
            `;
        });

    } catch(err) {
        console.error(err);
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Erro ao carregar lista de itens. Verifique o console.</td></tr>';
    }
}

// --- LÓGICA DO MODAL (FORMULÁRIO) ---

// Variável para controlar o modal
let modalBaixaInstancia = null;

// Função chamada pelo botão "Selecionar" da tabela acima
window.abrirModalBaixa = function(idItem) {
    // 1. Guarda o ID do item selecionado no input escondido
    const inputId = document.getElementById('baixaItemId');
    if(inputId) inputId.value = idItem;

    // 2. Limpa os campos visuais
    document.getElementById('baixaNome').value = '';
    document.getElementById('baixaDoc').value = '';

    // 3. Abre o modal
    const elModal = document.getElementById('modalBaixaPresencial');
    if(elModal) {
        // Cria instância se não existir, ou usa a existente
        if(!modalBaixaInstancia) modalBaixaInstancia = new bootstrap.Modal(elModal);
        modalBaixaInstancia.show();
    } else {
        alert('Erro: Modal de baixa presencial não encontrado no HTML.');
    }
}

// Função do botão "Confirmar Entrega" DENTRO do modal
window.confirmarBaixaPresencial = async function() {
    const id = document.getElementById('baixaItemId').value;
    const nome = document.getElementById('baixaNome').value;
    const doc = document.getElementById('baixaDoc').value;
    const contato = document.getElementById('baixaContato').value; // Novo campo

    if(!nome || !doc || !contato) return alert('Preencha Nome, Documento e Contato!');

    const btn = document.querySelector('#modalBaixaPresencial .btn-success');
    const txtOriginal = btn.innerHTML;
    btn.innerHTML = 'Salvando...';
    btn.disabled = true;

    try {
        const res = await fetch(`${API_URL}/guarda/baixa-presencial`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ 
                item_id: id, 
                guarda_id: usuarioLogado.id, 
                nome_recebedor: nome, 
                documento_recebedor: doc,
                contato_recebedor: contato // Enviando o novo dado
            })
        });

        const data = await res.json();

        if(res.ok) {
            alert('Item entregue e baixado com sucesso!');
            
            // Fecha modal e limpa campos
            const modalEl = document.getElementById('modalBaixaPresencial');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if(modal) modal.hide();
            
            carregarAcervo(); // Atualiza a lista
        } else {
            alert('Erro: ' + data.message);
        }
    } catch(err) {
        console.error(err);
        alert('Erro de conexão.');
    } finally {
        btn.innerHTML = txtOriginal;
        btn.disabled = false;
    }
}

// Atualize também o abrirModalBaixa para limpar o novo campo
window.abrirModalBaixa = function(idItem) {
    document.getElementById('baixaItemId').value = idItem;
    document.getElementById('baixaNome').value = '';
    document.getElementById('baixaDoc').value = '';
    document.getElementById('baixaContato').value = ''; // Limpa campo contato

    const el = document.getElementById('modalBaixaPresencial');
    const modal = new bootstrap.Modal(el);
    modal.show();
}