let listParticipants = [];

const objParticipant = {
    id: '',
    name: '',
    desactivate: ''
}

let edit = false;


const form = document.querySelector('#');
const nameInput = document.querySelector('#');
const desactivateInput = document.querySelector('#');
const buttonAdd = document.querySelector('#');

form.addEventListener('submit', sendForm);

function sendForm(e) {
    e.preventDefault();
    
    if(nameInput === "") {
        alert("Debe introducitr un nombre.");
        return;
    }

    if(edit) {
        edit = false;
    } else {
        objParticipant.id = Date.now();
        objParticipant.name = nameInput.value;
        objParticipant.desactivate = false;
        addParticipant();
    }

}

function addParticipant() {
    listParticipants.push({...objParticipant});
    cleanObjetParticipant();
    form.reset(); 
    // Falta añadir la funcion mostrar participantes
}
function cleanObjetParticipant() {
    objParticipant.id = " ";
    objParticipant.name = " ";
    objParticipant.desactivate = " ";
}

function deleteParticipants(id) {
    listParticipants = listParticipants.filter(participants => participants.id !== id);
}