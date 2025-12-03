// script/auth.js
const API_URL = 'http://localhost:3000';

// --- LÓGICA DE LOGIN ---
const formLogin = document.getElementById('formLogin');

if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const btnSubmit = formLogin.querySelector('button[type="submit"]');

        // Feedback visual simples
        const textoOriginal = btnSubmit.innerText;
        btnSubmit.innerText = 'Entrando...';
        btnSubmit.disabled = true;

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await res.json();

            if (res.ok) {
                // 1. Limpa dados antigos para evitar conflito
                localStorage.clear();

                // 2. Salva o Token (IMPORTANTE para as rotas protegidas)
                localStorage.setItem('token', data.token);
                
                // 3. Salva os dados do usuário (para mostrar o nome na tela)
                localStorage.setItem('usuario', JSON.stringify(data.user));
                
                // 4. Redirecionamento baseado no tipo de usuário
                if (data.user.tipo === 'admin') {
                    window.location.href = 'admin.html';
                } else if (data.user.tipo === 'guarda') {
                    window.location.href = 'guarda.html'; 
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                alert('Erro: ' + (data.message || 'Falha ao entrar'));
            }
        } catch (error) {
            console.error(error);
            alert('Erro de conexão com o servidor.');
        } finally {
            // Restaura o botão
            btnSubmit.innerText = textoOriginal;
            btnSubmit.disabled = false;
        }
    });
}

// --- LÓGICA DE CADASTRO ---
const formCadastro = document.getElementById('formCadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('cadNome').value;
        const email = document.getElementById('cadEmail').value;
        const senha = document.getElementById('cadSenha').value;
        const categoria = document.getElementById('cadCategoria').value;
        const documento = document.getElementById('cadDocumento').value;
        const btnSubmit = formCadastro.querySelector('button[type="submit"]');

        btnSubmit.innerText = 'Cadastrando...';
        btnSubmit.disabled = true;

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha, categoria, documento })
            });

            const data = await res.json();

            if (res.ok) {
                alert('Cadastro realizado com sucesso! Faça login agora.');
                window.location.href = 'login.html';
            } else {
                alert('Erro: ' + (data.message || 'Falha ao cadastrar'));
            }
        } catch (error) {
            console.error(error);
            alert('Erro de conexão com o servidor.');
        } finally {
            btnSubmit.innerText = 'Cadastrar';
            btnSubmit.disabled = false;
        }
    });
}

// --- FUNÇÃO DE LOGOUT GLOBAL (Pode ser usada em qualquer página) ---
function logout() {
    if(confirm("Deseja realmente sair?")) {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    }
}