// script/mascaras.js

// Máscara para CPF ou Matrícula (Se for CPF, formata. Se for Matrícula, apenas números)
function mascararDocumento(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    // Se tiver 11 dígitos, tratamos como CPF
    if (valor.length === 11) {
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    input.value = valor;
}

// Máscara para Telefone (92) 9XXXX-XXXX
function mascararTelefone(input) {
    let valor = input.value.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    input.value = valor.substring(0, 15); // Limita o tamanho
}

// Aplica as máscaras aos inputs quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    // Procura todos os inputs que precisam de máscara de telefone
    const inputsTel = document.querySelectorAll('input[id*="Telefone"], input[id*="Contato"]');
    inputsTel.forEach(input => {
        input.addEventListener('input', () => mascararTelefone(input));
    });

    // Procura todos os inputs que precisam de máscara de documento
    const inputsDoc = document.querySelectorAll('input[id*="Doc"], input[id*="Documento"]');
    inputsDoc.forEach(input => {
        input.addEventListener('input', () => mascararDocumento(input));
    });
});