const localStorageKey = "notes";

const search = document.querySelector(".search");
const notesPinned = document.querySelector(".notesPinned");
const notesToDo = document.querySelector(".notesToDo");
const notesDone = document.querySelector(".notesDone");

const addToLocalStorage = (arr) => {
  const stringifiedArray = JSON.stringify(arr);

  localStorage.setItem(localStorageKey, stringifiedArray);
};

const getNotesFromStorage = () => {
  return JSON.parse(localStorage.getItem(localStorageKey)) || [];
};

// addNote("Title", "Content", "lightblue", true, "26.03.2024 15:30", null);
// addNote("Title2", "Content2", "pink", false, "20.02.2024 16:30", "do, it, now");
// addNote(
//   "Title2",
//   "Content2",
//   "lightgreen",
//   false,
//   null,
//   "ogorek, pomidor",
//   "jeden, dwa, trzy, cztery, piec, szesc, siedem, osiem, dziewiec, dziesiec"
// );

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

function addNote(title, content, color, pinned, reminderDate, tags, isList) {
  const notesLocalStorage = getNotesFromStorage();
  const newNote = {
    id: Date.now(),
    title: title,
    content: content,
    color: color,
    isPinned: pinned,
    reminder: reminderDate,
    tags: tags.length > 0 ? tags?.split(",") : [],
    isList: isList.length > 0 ? isList?.split(",") : [],
  };
  notesLocalStorage.push(newNote);
  addToLocalStorage(notesLocalStorage);

  displayNotes();
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
    // debugger;
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
    const reminderDateContainer = document.createElement("div");
    reminderDateContainer.className = "noteReminderContainer";
    reminderDateContainer.innerHTML = "Przypomnienie: ";
    const reminder = document.createElement("p");
    reminder.className = "noteReminder";
    reminder.innerHTML = reminderDate.toLocaleString();
    console.log(reminderDate);
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

    const listContainer = document.createElement("p");
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
  editButton.id = "noteEdit_" + note.id;
  editButton.innerHTML = "edytuj";
  // editButton.addEventListener("click", editNote(note.id));
  note.appendChild(editButton);

  const doneButton = document.createElement("checkbox");
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
  const editButton = document.getElementById(id).querySelector(".noteEdit");
  const temp = document.getElementById(id);

  // editButton.addEventListener("click", function () {
  //   showNoteForm();
  // });
}

function showNoteForm(title, content, color, pinned, reminder, tags, list) {
  document.querySelector(".notesForm").style.display = "block";
  document.getElementById("form_noteTitle").focus();
}

function closeNoteForm() {
  clearValues();
  document.querySelector(".notesForm").style.display = "none";
}

function clearValues() {
  document.getElementById("form_noteTitle").value = "";
  document.getElementById("form_noteContent").value = "";
  document.getElementById("form_noteColor").value =
    "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.getElementById("form_notePinned").checked = false;
  document.getElementById("form_noteReminder").value = null;
  document.getElementById("form_noteTags").value = "";
  document.getElementById("form_noteList").value = "";
}

function displayForm() {
  var title = document.getElementById("form_noteTitle").value;
  var content = document.getElementById("form_noteContent").value;
  var color = document.getElementById("form_noteColor").value;
  var pinned = document.getElementById("form_notePinned").checked;
  var reminderDate = document.getElementById("form_noteReminder").value
    ? new Date(document.getElementById("form_noteReminder").value).toUTCString()
    : null;
  var tags = document.getElementById("form_noteTags").value;
  var list = document.getElementById("form_noteList").value;

  addNote(title, content, color, pinned, reminderDate, tags, list);
  clearValues();
  closeNoteForm();
}

function clearNotes() {
  notesPinned.innerHTML = "";
  notesToDo.innerHTML = "";
  notesDone.innerHTML = "";
}

document
  .querySelector(".formLabels")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    displayForm();
  });

search.addEventListener("input", searchNotes);
