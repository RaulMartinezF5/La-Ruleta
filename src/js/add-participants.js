let listParticipants = [];

const objParticipant = {
    id: '',
    name: '',
    desactivate: ''
}

let edit = false;


const form = document.querySelector('#add-section');
const nameInput = document.querySelector('#add-participant');
// const desactivateInput = document.querySelector('#');
const buttonAdd = document.querySelector('#add-button');

form.addEventListener('submit', sendForm);

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

    listParticipants.forEach(participant => {

        const { id, name, desactivate } = participant;
        const parraph = document.createElement("p")
        parraph.textContent = `${name}`;
        parraph.dataset.id = id;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        parraph.append(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.onclick = () => deleteParticipants(id);
        deleteButton.textContent = "Delete";
        parraph.append(deleteButton);

        const desactivateButton = document.createElement("button");
        desactivateButton.onclick = () => desactivateParticipant(id);
        desactivateButton.textContent = "Desactivate";
        parraph.append(desactivateButton);


        divParticipants.appendChild(parraph);
    });
}

function cleanHtml() {
    const divParticipants = document.querySelector("#list-section");
    while(divParticipants.firstChild){
        divParticipants.removeChild(divParticipants.firstChild);
    }
}

function cleanObjetParticipant() {
    objParticipant.id = " ";
    objParticipant.name = " ";
    objParticipant.desactivate = " ";
}

function desactivateParticipant(id) {
   listParticipants.forEach(participants => {
    if (participants.id == id) {
    if (participants.desactivate == false) {
        participants.desactivate = true; 
        console.log(participants.desactivate);
        return;   
    }
    participants.desactivate = false;
    console.log(participants.desactivate);
    }
    
   });
  
}

function deleteParticipants(id) {
    listParticipants = listParticipants.filter(participants => participants.id !== id);
        showParticipants();
    
}

function editParticipants(){
    objParticipant.name = nameInput.value;
  
    listParticipants.map( participants =>{
        if(participants.id === objParticipant.id){
            participants.id = objParticipant.id;
            participants.name = objParticipant.name;
            participants.desactivate = objParticipant.desactivate;
        }

    });

    cleanObjetParticipant();
}
