//iniciar as mensagens como vazias ao carregar a pagina
document.getElementById('mensagemAgradecimento').textContent = "";
document.getElementById('mensagemVolteSempre').textContent = "";


document.getElementById('valorConta').addEventListener('blur', () => {
    const input = document.getElementById('valorConta');
    let valorConta = input.value.replace(",", "."); 

    // Verifica se o valor digitado evalido
    if (!isNaN(valorConta) && valorConta.trim() !== "") {
        valorConta = parseFloat(valorConta).toFixed(2); // duas casas decimais
        input.value = valorConta.replace(".", ","); 
    } else {
        input.value = ""; // Limpa o campo caso o valor seja invalido
    }
});

//calculo a gorjeta ao clicar no botoa
document.getElementById('calcularBtn').addEventListener('click', () => {
    let valorConta = document.getElementById('valorConta').value.replace(",", ".");
    valorConta = parseFloat(valorConta);
    const qualidadeServico = parseFloat(document.getElementById('qualidadeServico').value);

    // Verifica se o valor da conta valido
    if (isNaN(valorConta) || valorConta <= 0) {
        document.getElementById('resultado').textContent = "Por favor, insira um valor válido.";
        document.getElementById('mensagemAgradecimento').textContent = ""; // Limpa mensagens
        document.getElementById('mensagemVolteSempre').textContent = ""; 
        return;
    }

    // Calcula a gorjeta usando callback
    const calcularGorjeta = (valor, porcentagem, callback) => {
        const gorjeta = valor * porcentagem;
        callback(gorjeta);
    };

    calcularGorjeta(valorConta, qualidadeServico, (gorjeta) => {
        const total = valorConta + gorjeta;

        // Exibe o resultado formatado com duas casas decimais e vírgulas
        document.getElementById('resultado').textContent = `Gorjeta: R$ ${gorjeta.toFixed(2).replace(".", ",")} | Total: R$ ${total.toFixed(2).replace(".", ",")}`;

        // Exibe mensagens de agradecimento
        document.getElementById('mensagemAgradecimento').textContent = "Obrigado pela preferência!";
        document.getElementById('mensagemVolteSempre').textContent = "Volte sempre!";
    });
});