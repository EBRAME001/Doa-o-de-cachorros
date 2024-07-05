document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    
    // Validação para o CEP
    const cepInput = document.getElementById("cep");

    function formatCep(value) {
        value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (value.length > 8) {
            value = value.slice(0, 8); // Garante que o CEP não ultrapasse 8 dígitos
        }
        if (value.length > 5) {
            value = value.slice(0, 5) + '-' + value.slice(5); // Insere hífen para formatar o CEP corretamente
        }
        return value;
    }

    cepInput.addEventListener('input', function() {
        cepInput.value = formatCep(cepInput.value); // Atualiza o campo de entrada com o CEP formatado
    });

    // Função para validar se o nome é completo (contém pelo menos um espaço)
    function isCompleteName(name) {
        return name.trim().includes(' ');
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nome = document.getElementById("nome").value;
        const endereco = document.getElementById("endereco").value;
        const cidade = document.getElementById("cidade").value;
        const bairro = document.getElementById("bairro").value;
        const cep = document.getElementById("cep").value;

        // Verifica se o nome é completo
        if (!isCompleteName(nome)) {
            alert("Por favor, insira seu nome completo.");
            return;
        }

        // Verifica se o CEP é válido (deve ter exatamente 8 dígitos numéricos)
        const cepDigits = cep.replace(/\D/g, '');
        if (cepDigits.length !== 8) {
            alert("CEP inválido. Deve conter 8 dígitos.");
            return;
        }

        // Armazena os dados no LocalStorage
        const formData = { nome, endereco, cidade, bairro, cep };
        localStorage.setItem('formData', JSON.stringify(formData));

        // Cria a URL com os dados do formulário como parâmetros de consulta
        const url = `formAction.html?nome=${encodeURIComponent(nome)}&endereco=${encodeURIComponent(endereco)}&cidade=${encodeURIComponent(cidade)}&bairro=${encodeURIComponent(bairro)}&cep=${encodeURIComponent(cep)}`;
        window.location.href = url; // Redireciona para a nova página com os dados na URL
    });
});
