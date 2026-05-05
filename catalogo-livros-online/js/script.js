const livrosJson = "json/livros.json"; // JSON com os livros
let livros = []; // Lista de livros

// livros do arquivo JSON
async function carregarLivros() {
    const response = await fetch(livrosJson);
    livros = await response.json();
    exibirLivros(); //livros carregados
}

//livros na interface
function exibirLivros() {
    const lista = document.getElementById("livros-lista");
    lista.innerHTML = ""; //impa a lista de livros
    livros.forEach((livro, index) => {
        const divLivro = document.createElement("div");
        divLivro.classList.add("livro");
        divLivro.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Gênero:</strong> ${livro.genero}</p>
            <p><strong>Ano:</strong> ${livro.ano}</p>
            <p><strong>Avaliações:</strong> ${livro.avaliacoes.join(", ")}</p>
            <input type="number" id="avaliacao-${index}" placeholder="Avaliar (1-5)" min="1" max="5">
            <button onclick="adicionarAvaliacao(${index})">Adicionar Avaliação</button>
        `;
        lista.appendChild(divLivro);
    });
}

// mensagens amigaveis para o usuario
function exibirMensagem(texto, tipo = "sucesso") {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.style.display = "block";
    mensagem.style.color = tipo === "sucesso" ? "#4CAF50" : "#FF0000";
    mensagem.style.borderColor = tipo === "sucesso" ? "#4CAF50" : "#FF0000";
    mensagem.style.backgroundColor = tipo === "sucesso" ? "#eafbe4" : "#fdecea";

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 3000);
}

//adicionaa uma avaliaçoa ao livro
function adicionarAvaliacao(index) {
    const avaliacaoInput = document.getElementById(`avaliacao-${index}`);
    const novaAvaliacao = parseInt(avaliacaoInput.value);

    if (isNaN(novaAvaliacao) || novaAvaliacao < 1 || novaAvaliacao > 5) {
        exibirMensagem("Por favor, insira uma avaliação válida (1-5).", "erro");
        return;
    }

    livros[index].avaliacoes.push(novaAvaliacao);
    exibirLivros();
    exibirMensagem("Avaliação adicionada com sucesso!", "sucesso");
}

//adiciona novo livro ao catalogo
document.getElementById("adicionar-livro-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const genero = document.getElementById("genero").value;
    const ano = parseInt(document.getElementById("ano").value);

    const novoLivro = { titulo, autor, genero, ano, avaliacoes: [] };

    livros.push(novoLivro);
    exibirLivros();
    exibirMensagem("Livro adicionado com sucesso!", "sucesso");
    e.target.reset();
});

// Busca livros no catalogo
document.getElementById("buscar-btn").addEventListener("click", () => {
    const busca = document.getElementById("buscar-livro").value.toLowerCase();

    //livros com base no titulo, autor ou genero
    const livrosFiltrados = livros.filter((livro) => {
        return (
            livro.titulo.toLowerCase().includes(busca) ||
            livro.autor.toLowerCase().includes(busca) ||
            livro.genero.toLowerCase().includes(busca)
        );
    });

    // Limpar a lista e exibir apenas os livros encontrados
    const lista = document.getElementById("livros-lista");
    lista.innerHTML = ""; // Limpa a lista existente

    // livro nao encontrado
    if (livrosFiltrados.length === 0) {
        exibirMensagem("Livro não encontrado.", "erro");
        return;
    }

    // livros filtrados
    livrosFiltrados.forEach((livro, index) => {
        const divLivro = document.createElement("div");
        divLivro.classList.add("livro");
        divLivro.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Gênero:</strong> ${livro.genero}</p>
            <p><strong>Ano:</strong> ${livro.ano}</p>
            <p><strong>Avaliações:</strong> ${livro.avaliacoes.join(", ")}</p>
            <input type="number" id="avaliacao-${index}" placeholder="Avaliar (1-5)" min="1" max="5">
            <button onclick="adicionarAvaliacao(${index})">Adicionar Avaliação</button>
        `;
        lista.appendChild(divLivro);
    });
});

//lassificar os livros
function classificarLivros(criterio) {
    if (criterio === "titulo") {
        livros.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (criterio === "autor") {
        livros.sort((a, b) => a.autor.localeCompare(b.autor));
    } else if (criterio === "avaliacao") {
        livros.sort((a, b) => {
            const mediaAvaliacaoA = a.avaliacoes.length
                ? a.avaliacoes.reduce((sum, val) => sum + val, 0) / a.avaliacoes.length
                : 0;
            const mediaAvaliacaoB = b.avaliacoes.length
                ? b.avaliacoes.reduce((sum, val) => sum + val, 0) / b.avaliacoes.length
                : 0;
            return mediaAvaliacaoB - mediaAvaliacaoA;
        });
    }
    exibirLivros();
    exibirMensagem(`Livros classificados por ${criterio}!`, "sucesso");
}

// Adiciona classificação
document.getElementById("classificar-titulo").addEventListener("click", () => {
    classificarLivros("titulo");
});
document.getElementById("classificar-autor").addEventListener("click", () => {
    classificarLivros("autor");
});
document.getElementById("classificar-avaliacao").addEventListener("click", () => {
    classificarLivros("avaliacao");
});

// Carrega livros ao iniciar  pg
carregarLivros();