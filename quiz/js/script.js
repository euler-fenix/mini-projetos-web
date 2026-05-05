// Perguntas
const questions = [
  "Quem foi o imperador romano que ordenou a construção do Coliseu?",
  "Quem foi o líder da Revolução Francesa?",
  'Quem foi o comandante militar durante a Segunda Guerra Mundial, conhecido como "O General de Ferro"?',
  "Quem foi o cientista que desenvolveu a teoria da evolução das espécies?",
];

const options = [
  ["César Augusto", "Nero", "Constantino", "Vespasiano"],
  [
    "Maximilien Robespierre",
    "Napoleão Bonaparte",
    "Georges Danton",
    "Louis XVI",
  ],
  [
    "Dwight D. Eisenhower",
    "Winston Churchill",
    "George S. Patton",
    "Erwin Rommel",
  ],
  ["Marie Curie", "Charles Darwin", "Albert Einstein", "Galileo Galilei"],
];

const correctAnswers = [3, 0, 2, 1]; //respostas corretas p/ cada pergunta

let reloadButton = document.getElementById("reload");
reloadButton.style.display = "none"; // Esconde o botao "Reload" inicialment
let nowQuestion = Math.floor(Math.random() * questions.length); //pergunta aleatoria

//gera uma nova pergunta
function generateQuestions() {
  document.getElementById("question").innerHTML = questions[nowQuestion];
  const optionsContainer = document.querySelectorAll(".alternative");

  optionsContainer.forEach((element, index) => {
    element.textContent = options[nowQuestion][index];
    element.style.backgroundColor = ""; //resetar cor do botao
    element.disabled = false; //habilita cliques novamente
  });
}

//verifica resposta
function checkAnswer(answer) {
  answer = parseInt(answer); 
  let statusAnswer = document.getElementById("statusAnswer");
  const alternatives = document.querySelectorAll(".alternative");

  //desabilita cliques nos botoes
  alternatives.forEach((button) => {
    button.disabled = true;
  });

  // Verifica se esta correta
  if (answer === correctAnswers[nowQuestion]) {
    statusAnswer.innerHTML = "Acertou!!!";
    alternatives[answer].style.backgroundColor = "green"; //botao correto em verde
  } else {
    statusAnswer.innerHTML = `Errou! A resposta correta é: ${options[nowQuestion][correctAnswers[nowQuestion]]}`;
    alternatives[answer].style.backgroundColor = "red"; //botao errado em vermelho
    alternatives[correctAnswers[nowQuestion]].style.backgroundColor = "green"; //destaca resposta correta
  }

  //exibe botao "Reload" apos resposta
  reloadButton.style.display = "block";
}

//adiciona eventos nos botoes
function selectButton() {
  const alternatives = document.querySelectorAll(".alternative");

  alternatives.forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.value;
      checkAnswer(answer);
    });
  });
}

//recarrega a pagina com nova pergunta
reloadButton.addEventListener("click", () => {
  //selecionar nova pergunta aleatoriamente
  nowQuestion = Math.floor(Math.random() * questions.length);

  //gera nova pergunta e reseta o status
  generateQuestions();
  document.getElementById("statusAnswer").innerHTML = "";
  reloadButton.style.display = "none";
});

//inicializaçao
generateQuestions();
selectButton();