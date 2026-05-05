// Elementos
const notaInput = document.getElementById("notaInput");
const adicionarNotaBtn = document.getElementById("adicionarNotaBtn");
const listaNotas = document.getElementById("listaNotas");
const mensagemElemento = document.getElementById("mensagem");

//exibir mensagens
function exibirMensagem(texto, cor) {
    mensagemElemento.textContent = texto;
    mensagemElemento.style.color = cor;
    mensagemElemento.classList.add("visivel");

    // Remove mensagem depois 3s
    setTimeout(() => {
        mensagemElemento.classList.remove("visivel");
    }, 3000);
}

// adiciona nova nota
function adicionarNota() {
    const notaTexto = notaInput.value.trim();

    if (notaTexto === "") {
        exibirMensagem("Campo sem anotação válida!", "#d9534f");
        return;
    }

    const li = document.createElement("li");
    const notaTextoElemento = document.createElement("span");
    notaTextoElemento.textContent = notaTexto;

    const excluirIcone = document.createElement("i");
    excluirIcone.classList.add("fas", "fa-trash"); //  icone
    excluirIcone.addEventListener("click", () => {
        li.remove();
        exibirMensagem("Anotação excluída com sucesso!", "#2E8B57"); 
    });

    li.appendChild(notaTextoElemento);
    li.appendChild(excluirIcone);
    listaNotas.appendChild(li);

    notaInput.value = "";
    notaInput.focus();
}

// Eventos
adicionarNotaBtn.addEventListener("click", adicionarNota);
notaInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        adicionarNota();
    }
});