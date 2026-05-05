//interface
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const messagesDiv = document.getElementById("messages");

//  notificaçoes
function showMessage(message, isError = false) {
    messagesDiv.textContent = message; //texto da mensagem
    messagesDiv.style.color = isError ? "#dc3545" : "#28a745"; // Vermelho para erros, verde para sucesso

    setTimeout(() => {
        messagesDiv.textContent = ""; // Limpa mensagem depois de 3s
    }, 3000);
}

//tarefas ao iniciar
document.addEventListener("DOMContentLoaded", renderTasks);
addTaskBtn.addEventListener("click", addTask);

//adiciona nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        showMessage("Campo sem Tarefa válida!", true); //mensagem de erro
        return;
    }

    const listItem = document.createElement("li");

    //checkbox tarefa como concluida ou nao concluida
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      listItem.classList.toggle("completed");

    //mensagem no estado do checkbox
    if (checkbox.checked) {
        showMessage("Lista concluída com sucesso!"); //mensagem para tarefa concluda
    } else {
        showMessage("Lista não concluída!", true); //mensagem vermelho para tarefa desmarcada
    }
});



    //texto tarefa
    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;

    //lixeira para excluir tarefa
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.title = "Deletar tarefa";
    deleteIcon.addEventListener("click", () => {
        taskList.removeChild(listItem);
        showMessage("Lista excluída com sucesso!"); // Mensagem excluir
    });

    //item da lista
    listItem.appendChild(checkbox);
    listItem.appendChild(taskTextElement);
    listItem.appendChild(deleteIcon);
    taskList.appendChild(listItem);

    // Limpa campo
    taskInput.value = "";
}


function renderTasks() {
    taskList.innerHTML = ""; // Limpa lista
}