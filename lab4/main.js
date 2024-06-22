const localStorageKey = "notes";

const search = document.querySelector(".search");
const notesPinned = document.querySelector(".notesPinned");
const notesToDo = document.querySelector(".notesToDo");
const notesDone = document.querySelector(".notesDone");
const formTitle = document.querySelector("#form_noteTitle");
const formContent = document.querySelector("#form_noteContent");
const formColor = document.querySelector("#form_noteColor");
const formPinned = document.querySelector("#form_notePinned");
const formReminder = document.querySelector("#form_noteReminder");
const formTags = document.querySelector("#form_noteTags");
const formList = document.querySelector("#form_noteList");
const formSubmitButton = document.querySelector(".formSubmitButton");
let editingNoteId = null;

const addToLocalStorage = (arr) => {
  const stringifiedArray = JSON.stringify(arr);
  localStorage.setItem(localStorageKey, stringifiedArray);
};

const getNotesFromStorage = () => {
  return JSON.parse(localStorage.getItem(localStorageKey)) || [];
};

const displayNotes = () => {
  clearNotes();
  const notesLocalStorage = getNotesFromStorage();

  notesLocalStorage.forEach((note) => {
    displayNote(
      note.id,
      note.title,
      note.content,
      note.color,
      note.isPinned,
      note.reminder,
      note.tags,
      note.isList
    );
  });
};

displayNotes();

function searchNotes() {
  const notes = document.querySelectorAll(".note");
  const searchValue = search.value.toLowerCase();
  notes.forEach((note) => {
    const title = note.querySelector(".noteTitle").innerHTML.toLowerCase();
    const content = note.querySelector(".noteContent").innerHTML.toLowerCase();
    const tags = note.querySelector(".noteTagsContainer");
    const listContainer = note.querySelector(".noteList");
    if (
      title.includes(searchValue) ||
      content.includes(searchValue) ||
      (tags && tags.innerHTML.toLowerCase().includes(searchValue)) ||
      (listContainer &&
        listContainer.innerHTML.toLowerCase().includes(searchValue))
    ) {
      note.style.display = "grid";
    } else {
      note.style.display = "none";
    }
  });
}

function addOrUpdateNote() {
  const title = formTitle.value;
  const content = formContent.value;
  const color = formColor.value;
  const pinned = formPinned.checked;
  const reminderDate = formReminder.value
    ? new Date(formReminder.value).toUTCString()
    : null;
  const tags = formTags.value;
  const list = formList.value;

  const notesLocalStorage = getNotesFromStorage();

  if (editingNoteId) {
    const noteIndex = notesLocalStorage.findIndex(
      (note) => note.id === editingNoteId
    );
    notesLocalStorage[noteIndex] = {
      id: editingNoteId,
      title,
      content,
      color,
      isPinned: pinned,
      reminder: reminderDate,
      tags: tags.length > 0 ? tags.split(",") : [],
      isList: list.length > 0 ? list.split(",") : [],
    };
    editingNoteId = null;
  } else {
    const newNote = {
      id: Date.now(),
      title,
      content,
      color,
      isPinned: pinned,
      reminder: reminderDate,
      tags: tags.length > 0 ? tags.split(",") : [],
      isList: list.length > 0 ? list.split(",") : [],
    };
    notesLocalStorage.push(newNote);
  }

  addToLocalStorage(notesLocalStorage);
  displayNotes();
  clearValues();
  closeNoteForm();
}

function displayNote(
  id,
  title,
  content,
  color,
  pinned,
  reminderDate,
  tags,
  isList
) {
  const note = document.createElement("div");
  note.className = "note";
  note.id = id;
  note.style.backgroundColor = color;

  const noteTitle = document.createElement("h2");
  noteTitle.className = "noteTitle";
  noteTitle.innerHTML = title;
  note.appendChild(noteTitle);

  const noteBody = document.createElement("div");
  noteBody.className = "noteBody";

  if (tags) {
    const tagsContainer = document.createElement("div");
    tagsContainer.className = "noteTagsContainer";
    const tagsArray = tags.map((tag) => {
      const tagElement = document.createElement("span");
      tagElement.className = "noteTag";
      tagElement.innerHTML = "#" + tag.trim();
      return tagElement;
    });
    tagsArray.forEach((tag) => {
      tagsContainer.appendChild(tag);
    });
    noteBody.appendChild(tagsContainer);
  }

  if (reminderDate) {
    reminderDate = new Date(reminderDate);
    const reminderDateContainer = document.createElement("div");
    reminderDateContainer.className = "noteReminderContainer";
    reminderDateContainer.innerHTML = "Przypomnienie: ";
    const reminder = document.createElement("p");
    reminder.className = "noteReminder";
    reminder.innerHTML = reminderDate.toLocaleString();
    reminderDateContainer.appendChild(reminder);
    noteBody.appendChild(reminderDateContainer);
  }

  const noteContent = document.createElement("p");
  noteContent.className = "noteContent";
  noteContent.innerHTML = content;
  noteBody.appendChild(noteContent);

  if (isList?.length) {
    const list = isList.map((word) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = word.trim();
      return listItem;
    });

    const listContainer = document.createElement("ul");
    listContainer.className = "noteList";
    list.forEach((item) => {
      const checkItem = document.createElement("input");
      checkItem.type = "checkbox";
      checkItem.addEventListener("change", function () {
        if (this.checked) {
          listContainer.appendChild(this.parentElement);
        } else {
          listContainer.insertBefore(
            this.parentElement,
            listContainer.firstChild
          );
        }
      });
      item.insertBefore(checkItem, item.firstChild);
      listContainer.appendChild(item);
    });

    noteBody.appendChild(listContainer);
  }

  note.appendChild(noteBody);

  const editButton = document.createElement("button");
  editButton.classList.add("noteEdit");
  editButton.innerHTML = "edytuj";
  editButton.addEventListener("click", () => editNote(id));
  note.appendChild(editButton);

  const doneButton = document.createElement("button");
  doneButton.classList.add("noteDone");
  doneButton.innerHTML = "&#10004";
  doneButton.style.backgroundColor = color;
  doneButton.addEventListener("click", function () {
    if (!doneButton.checked) {
      doneButton.style.backgroundColor = "black";
      doneButton.style.color = "white";
      doneButton.innerHTML = "&#10006";
      doneButton.checked = true;
      notesDone.appendChild(note);
    } else {
      doneButton.style.backgroundColor = color;
      doneButton.style.color = "black";
      doneButton.innerHTML = "&#10004";
      doneButton.checked = false;
      if (pinned) {
        notesPinned.appendChild(note);
      } else {
        notesToDo.appendChild(note);
      }
    }
  });
  note.appendChild(doneButton);

  if (pinned) {
    notesPinned.appendChild(note);
  } else {
    notesToDo.appendChild(note);
  }
}

function editNote(id) {
  const notesLocalStorage = getNotesFromStorage();
  const noteToEdit = notesLocalStorage.find((note) => note.id === id);

  if (!noteToEdit) {
    console.error("Notatka nie znaleziona!");
    return;
  }

  editingNoteId = id;

  showNoteForm(
    noteToEdit.title,
    noteToEdit.content,
    noteToEdit.color,
    noteToEdit.isPinned,
    noteToEdit.reminder,
    noteToEdit.tags,
    noteToEdit.isList,
    true
  );
}

function showNoteForm(
  title = "",
  content = "",
  color = "#ffffff",
  pinned = false,
  reminder = "",
  tags = [],
  list = [],
  edit = false
) {
  formTitle.value = title;
  formContent.value = content;
  formColor.value = color;
  formPinned.checked = pinned;
  formReminder.value = reminder
    ? new Date(reminder).toISOString().slice(0, 16)
    : "";
  formTags.value = tags.length ? tags.join(", ") : "";
  formList.value = list.length ? list.join(", ") : "";
  document.querySelector(".formSubmitButton").innerHTML = edit
    ? "Zapisz"
    : "Dodaj";
  if (edit) {
    document.querySelector(".removeButton").innerHTML = "Usuń";
    document.querySelector(".removeButton").style.display = "block";
  }
  document.querySelector(".notesForm").style.display = "block";
  document.getElementById("form_noteTitle").focus();
}

function closeNoteForm() {
  clearValues();
  document.querySelector(".notesForm").style.display = "none";
}

function clearValues() {
  formTitle.value = "";
  formContent.value = "";
  formColor.value = "#" + Math.floor(Math.random() * 16777215).toString(16);
  formPinned.checked = false;
  formReminder.value = null;
  formTags.value = "";
  formList.value = "";
}

function clearNotes() {
  notesPinned.innerHTML = "";
  notesToDo.innerHTML = "";
  notesDone.innerHTML = "";
}

function removeNote() {
  const notesLocalStorage = getNotesFromStorage();
  const noteIndex = notesLocalStorage.findIndex(
    (note) => note.id === editingNoteId
  );
  notesLocalStorage.splice(noteIndex, 1);
  addToLocalStorage(notesLocalStorage);
  displayNotes();
  clearValues();
  closeNoteForm();
}

document
  .querySelector(".formSubmitButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    addOrUpdateNote();
  });

document
  .querySelector(".removeButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    removeNote();
  });

search.addEventListener("input", searchNotes);

setInterval(() => {
  const notes = getNotesFromStorage();
  const currentDate = new Date();

  notes.forEach((note) => {
    if (note.reminder) {
      const reminderDate = new Date(note.reminder);
      if (
        reminderDate.getFullYear() === currentDate.getFullYear() &&
        reminderDate.getMonth() === currentDate.getMonth() &&
        reminderDate.getDate() === currentDate.getDate() &&
        reminderDate.getHours() === currentDate.getHours() &&
        reminderDate.getMinutes() === currentDate.getMinutes()
      ) {
        alert(
          `${note.title} - ${note.content} - ${reminderDate.toLocaleString()}`
        );
      }
    }
  });
}, 1000);
