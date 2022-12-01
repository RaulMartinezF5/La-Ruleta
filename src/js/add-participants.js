let listParticipants = [
    { "id": "123456", "name": "Johnny", "desactivate": false },
    { "id": "123457", "name": "Patata", "desactivate": false },
    { "id": "123458", "name": "Cebolla", "desactivate": false }
];
showParticipants();


const objParticipant = {
    id: "",
    name: "",
    desactivate: "",
};

let edit = false;

const form = document.querySelector("#add-section");
const nameInput = document.querySelector("#add-participant");
// const desactivateInput = document.querySelector('#');
const buttonAdd = document.querySelector("#add-button");

form.addEventListener("submit", sendForm);

function sendForm(e) {
    e.preventDefault();

    if (nameInput.value === "") {
        alert("Debe introducitr un nombre.");
        return;
    }

    if (edit) {
        editParticipants();
        edit = false;
    } else {
        objParticipant.id = Date.now();
        objParticipant.name = nameInput.value;
        objParticipant.desactivate = false;
        addParticipant();
    }
}

function addParticipant() {
    listParticipants.push({ ...objParticipant });
    cleanObjetParticipant();
    form.reset();
    showParticipants();
}

function showParticipants() {
    cleanHtml();
    const divParticipants = document.querySelector("#list-section");

    listParticipants.forEach((participant) => {
        const { id, name, desactivate } = participant;
        const parraph = document.createElement("div");
        parraph.classList.add("list-item");
        parraph.dataset.id = id;
        parraph.innerHTML = `<p name="${id}">${name}</p>`;

        const editButton = document.createElement("button");
        editButton.onclick = () => editParticipants(id, name);
        editButton.setAttribute("name", id);
        editButton.classList.add("edit");
        editButton.textContent = "Edit";
        parraph.append(editButton);

        const desactivateButton = document.createElement("button");
        desactivateButton.onclick = () => desactivateParticipant(id);
        desactivateButton.setAttribute("name", id);
        desactivateButton.classList.add("desactivate");
        desactivateButton.textContent = "Desactivate";
        parraph.append(desactivateButton);

        const deleteButton = document.createElement("button");
        deleteButton.onclick = () => deleteParticipants(id);
        deleteButton.setAttribute("name", id);
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Delete";
        parraph.append(deleteButton);

        const updateInput = document.createElement("input");
        updateInput.setAttribute("type", "text");
        updateInput.setAttribute("id", id);
        updateInput.classList.add("invisible");
        updateInput.setAttribute("value", name);
        updateInput.setAttribute("name", name);
        parraph.append(updateInput);

        const updateButton = document.createElement("button");
        updateButton.onclick = () => updateParticipants(id, name);
        updateButton.classList.add("invisible", "edit");
        updateButton.textContent = "Update";
        updateButton.setAttribute("name", name);
        parraph.append(updateButton);

        const cancelButton = document.createElement("button");
        cancelButton.onclick = () => cancelParticipants(id, name);
        cancelButton.classList.add("invisible", "cancel");
        cancelButton.textContent = "Cancel";
        cancelButton.setAttribute("name", name);
        parraph.append(cancelButton);

        divParticipants.appendChild(parraph);
    });
}

function cleanHtml() {
    const divParticipants = document.querySelector("#list-section");
    while (divParticipants.firstChild) {
        divParticipants.removeChild(divParticipants.firstChild);
    }
}

function cleanObjetParticipant() {
    objParticipant.id = " ";
    objParticipant.name = " ";
    objParticipant.desactivate = " ";
}

function desactivateParticipant(id) {
    listParticipants.forEach((participants) => {
        if (participants.id == id) {
            if (participants.desactivate == false) {
                participants.desactivate = true;
                return;
            }
            participants.desactivate = false;
        }
    });
}

function deleteParticipants(id) {
    listParticipants = listParticipants.filter(
        (participants) => participants.id !== id
    );
    showParticipants();
}
function updateParticipants(id, name) {
    const nameUpdate = document.getElementById(id);
    listParticipants.forEach(participants => {
        if (participants.id === id) {
            participants.name = nameUpdate.value;
        }

    });
    cleanObjetParticipant();
    showParticipants();
}

function editParticipants(id, name) {
    const allBtnPrimary = document.getElementsByName(id);
    allBtnPrimary.forEach((element) => {
        element.classList.remove("visible");
        element.classList.add("invisible");
    });

    const allBtnSecondary = document.getElementsByName(name);
    allBtnSecondary.forEach((element) => {
        element.classList.remove("invisible");
        element.classList.add("visible");
    });
}

function cancelParticipants(id, name) {
    const allBtnPrimary = document.getElementsByName(id);
    allBtnPrimary.forEach((element) => {
        element.classList.remove("invisible");
        element.classList.add("visible");
    });

    const allBtnSecondary = document.getElementsByName(name);
    allBtnSecondary.forEach((element) => {
        element.classList.remove("visible");
        element.classList.add("invisible");
    });
}
