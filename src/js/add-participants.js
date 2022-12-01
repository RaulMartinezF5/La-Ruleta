let listParticipants = [];

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
    // parraph.classList.add("display-container");
    // const container = parraph.appendChild(div);


    // const parraph = document.createElement("div"); // <div></div>
    // parraph.id = "app"; // <div id="app"></div>
    // parraph.appendChild(div);
    // // test.classList.add("test-container");
    // // document.body.appendChild(div);

    parraph.textContent = `${name}`;
    parraph.dataset.id = id;

    const editButton = document.createElement("button");
    editButton.onclick = () => editParticipants(id);
    editButton.setAttribute("name", id);
    editButton.classList.add("edit");
    editButton.textContent = "Edit";
    parraph.append(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.onclick = () => deleteParticipants(id);
    deleteButton.setAttribute("name", id);
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";
    parraph.append(deleteButton);

    const desactivateButton = document.createElement("button");
    desactivateButton.onclick = () => desactivateParticipant(id);
    desactivateButton.setAttribute("name", id);
    desactivateButton.classList.add("desactivate");
    desactivateButton.textContent = "Desactivate";
    parraph.append(desactivateButton);

    const updateInput = document.createElement("input");
    updateInput.setAttribute("id", id);
    updateInput.classList.add("invisible");
    updateInput.setAttribute("value", name);
    updateInput.setAttribute("name", name);
    parraph.append(updateInput);

    const updateButton = document.createElement("button");
    updateButton.onclick = () => updateParticipants(id, name);
    updateButton.classList.add("invisible");
    updateButton.textContent = "Update";
    updateButton.setAttribute("name", name);
    parraph.append(updateButton);

    const cancelButton = document.createElement("button");
    cancelButton.onclick = () => cancelParticipants(id, name);
    cancelButton.classList.add("invisible");

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

function updateParticipants() {
  objParticipant.name = nameInput.value;

  listParticipants.map((participants) => {
    if (participants.id === objParticipant.id) {
      participants.id = objParticipant.id;
      participants.name = objParticipant.name;
      participants.desactivate = objParticipant.desactivate;
    }
  });

  cleanObjetParticipant();
}

function editParticipants(id, name) {
  const allBtnPrimary = document.getElementsByName(id);
  allBtnPrimary.forEach((element) => {
    element.style.display = "none";
  });

  const allBtnSecondary = document.getElementsByName(name);
  allBtnSecondary.forEach((element) => {
    element.style.display = "inline";
  });
  console.log(allBtnPrimary);
  console.log(allBtnSecondary);
}

function cancelParticipants(id, name) {
  const allBtnPrimary = document.getElementsByName(id);
  allBtnPrimary.forEach((element) => {
    element.style.display = "inline";
  });

  const allBtnSecondary = document.getElementsByName(name);
  allBtnSecondary.forEach((element) => {
    element.style.display = "none";
  });
  console.log(allBtnPrimary);
  console.log(allBtnSecondary);
}
