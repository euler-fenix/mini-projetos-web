let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

//salvar contatos 
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

//exibir mensagens
function showMessage(message) {
    const msg = document.getElementById("message");
    msg.textContent = message;
    msg.classList.remove("hidden");

    //mensagens desapareçam depois 3s
    setTimeout(() => {
        msg.classList.add("hidden");
        msg.textContent = ""; // Limpa contedo da mensagem
    }, 3000);
}

//renderizar a lista de contatos
function renderContacts() {
    const contactList = document.getElementById("contacts");
    contactList.innerHTML = "";

    if (contacts.length === 0) {
        contactList.innerHTML = "<p>Favor adicionar um contato!</p>";
        return;
    }

    contacts.forEach((contact, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${contact.name}</strong><br>
                ${contact.phone}<br>
                ${contact.email}
            </div>
            <div class="icons">
                <i class="fas fa-edit" onclick="editContact(${index})"></i>
                <i class="fas fa-trash-alt" onclick="deleteContact(${index})"></i>
            </div>
        `;
        contactList.appendChild(li);
    });
}

//adicionar mascara ao telefone enquanto o usuario digita
document.getElementById("phone").addEventListener("input", function (event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, "");

    if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,4})$/, "($1) $2");
    } else {
        value = value.replace(/^(\d*)$/, "($1");
    }

    input.value = value;
});

//valida os campos do formulário
function validateFields(name, phone, email) {
    if (!name.trim()) {
        alert("O nome é obrigatório.");
        return false;
    }

    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
        alert("O telefone deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.");
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("O e-mail deve ser válido.");
        return false;
    }

    return true;
}

//adicionar ou salvar um contato
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    if (!validateFields(name, phone, email)) {
        return;
    }

    const newContact = { name, phone, email };

    const isEditing = contacts.some(contact => contact.name === name);
    if (isEditing) {
        showMessage("Contato editado com sucesso!");
    } else {
        showMessage("Contato salvo com sucesso!");
    }

    contacts.push(newContact);
    saveContacts();
    renderContacts();

    document.getElementById("contact-form").reset(); // Limpa 
});

//edita contato existente
function editContact(index) {
    const contact = contacts[index];

    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;

    contacts.splice(index, 1); // Remove contato da lista para ediçao
    saveContacts();
    renderContacts();
}

// excluir um contato
function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
    showMessage("Contato excluído com sucesso!");
}

//lista de contatos a carregar pg
renderContacts();