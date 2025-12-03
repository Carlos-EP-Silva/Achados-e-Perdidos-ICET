//perfil.js
const API_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');

    if(!token) {
        window.location.href = 'login.html';
        return;
    }

    // 1. CARREGAR DADOS DO USUÁRIO
    carregarDadosPerfil(token);

    // 2. SALVAR DADOS (PUT)
    configurarFormulario(token);
});

function carregarDadosPerfil(token) {
    fetch(`${API_URL}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
        if(!res.ok) throw new Error("Erro ao buscar perfil");
        return res.json();
    })
    .then(user => {
        // Preenche os campos
        document.getElementById('pNome').value = user.nome;
        document.getElementById('pEmail').value = user.email;
        
        // Preenche os editáveis
        if(user.categoria) document.getElementById('pCategoria').value = user.categoria;
        document.getElementById('pDocumento').value = user.documento || '';
        document.getElementById('pTelefone').value = user.telefone || '';
    })
    .catch(err => {
        console.error(err);
        alert('Sessão expirada ou erro. Faça login novamente.');
        window.location.href = 'login.html';
    });
}

function configurarFormulario(token) {
    const form = document.getElementById('formPerfil');
    if(!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const categoria = document.getElementById('pCategoria').value;
        const documento = document.getElementById('pDocumento').value;
        const telefone = document.getElementById('pTelefone').value;
        
        const btn = form.querySelector('button');
        const txtOriginal = btn.innerText;
        btn.innerText = "Salvando...";
        btn.disabled = true;

        try {
            const res = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ categoria, documento, telefone })
            });
            
            if(res.ok) {
                alert('Perfil atualizado com sucesso!');
            } else {
                const data = await res.json();
                alert('Erro: ' + data.message);
            }
        } catch(err) {
            console.error(err);
            alert('Erro de conexão.');
        } finally {
            btn.innerText = txtOriginal;
            btn.disabled = false;
        }
    });
}