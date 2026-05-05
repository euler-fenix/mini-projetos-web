let saldo = 1000; // Saldo inicial ficticio

//atualiza placeholder campo de valor
document.getElementById("operation").addEventListener("change", function() {
    const valorInput = document.getElementById("amount");
    const resultado = document.getElementById("result");

    //limpa mensagem ao mudar a operaçao
    resultado.textContent = "";

    // ajuste habilita/desabilita o campo de valor
    if (this.value === "consultar") {
        valorInput.placeholder = "Não é necessário inserir valor";
        valorInput.disabled = true; //campo
    } else {
        valorInput.placeholder = "Insira o valor (R$)";
        valorInput.disabled = false; //abilita o campo
    }
});

//operação selecionada
function realizarOperacao() {
    const operacao = document.getElementById("operation").value;
    const valorInput = document.getElementById("amount");
    const resultado = document.getElementById("result");
    const valor = parseFloat(valorInput.value);

    try {
        if (operacao === "consultar") {
            //consulta saldo
            resultado.textContent = `Seu saldo atual é: R$ ${saldo.toFixed(2)}`;
            resultado.className = "success"; //mensagem em verde
            return;
        }

        if (isNaN(valor) || valor <= 0) {
            throw new Error("Valor inválido. Por favor, insira um valor positivo.");
        }

        if (operacao === "sacar") {
            //saque 
            if (valor > saldo) {
                throw new Error("Saldo insuficiente para realizar o saque.");
            }
            saldo -= valor;
            resultado.textContent = `Saque de R$ ${valor.toFixed(2)} realizado com sucesso! Saldo atual: R$ ${saldo.toFixed(2)}`;
            resultado.className = "success";
        } else if (operacao === "depositar") {
            //deposito
            saldo += valor;
            resultado.textContent = `Depósito de R$ ${valor.toFixed(2)} realizado com sucesso! Saldo atual: R$ ${saldo.toFixed(2)}`;
            resultado.className = "success";
        } else {
            throw new Error("Operação inválida.");
        }
    } catch (error) {
        resultado.textContent = ` ${error.message}`;
        resultado.className = "error"; // mensagem em vermelho
    }

    // Limpa campo entrada operação
    valorInput.value = "";
}