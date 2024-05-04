const addNote = document.querySelector(".addNote");
const search = document.querySelector(".search");
const notesPinned = document.querySelector(".notesPinned");
const notesToDo = document.querySelector(".notesToDo");
const notesDone = document.querySelector(".notesDone");
let id = 1;

createNote("Title", "Content", "lightblue", true, "26.03.2024 15:30", null);
createNote(
  "Title2",
  "Content2",
  "pink",
  false,
  "20.02.2024 16:30",
  "do, it, now"
);
createNote(
  "Title2",
  "Content2",
  "lightgreen",
  false,
  null,
  "ogorek, pomidor",
  "jeden, dwa, trzy"
);

function searchNotes() {
  const notes = document.querySelectorAll(".note");
  const searchValue = search.value.toLowerCase();
  notes.forEach((note) => {
    const title = note.querySelector(".noteTitle").innerHTML.toLowerCase();
    const content = note.querySelector(".noteContent").innerHTML.toLowerCase();
    const tags = note.querySelector(".noteTagsContainer");
    if (
      title.includes(searchValue) ||
      content.includes(searchValue) ||
      (tags && tags.innerHTML.toLowerCase().includes(searchValue))
    ) {
      note.style.display = "grid";
    } else {
      note.style.display = "none";
    }
  });
}

function createNote(title, content, color, pinned, reminderDate, tags, isList) {
  const note = document.createElement("div");
  note.className = "note";
  note.id = id++;
  note.style.backgroundColor = color;

  const noteTitle = document.createElement("h2");
  noteTitle.className = "noteTitle";
  noteTitle.innerHTML = title;
  note.appendChild(noteTitle);

  if (tags) {
    const tagsContainer = document.createElement("div");
    tagsContainer.className = "noteTagsContainer";
    const tagsArray = tags.split(",").map((tag) => {
      const tagElement = document.createElement("span");
      tagElement.className = "noteTag";
      tagElement.innerHTML = "#" + tag.trim();
      return tagElement;
    });
    tagsArray.forEach((tag) => {
      tagsContainer.appendChild(tag);
    });
    note.appendChild(tagsContainer);
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
    note.appendChild(reminderDateContainer);
  }

  const noteContent = document.createElement("p");
  noteContent.className = "noteContent";
  noteContent.innerHTML = content;
  note.appendChild(noteContent);

  if (isList && isList !== "") {
    const list = isList.split(",").map((word) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = word.trim();
      return listItem;
    });

    const listContainer = document.createElement("p");
    listContainer.className = "noteList";
    list.forEach((item) => {
      listContainer.appendChild(item);
    });

    note.appendChild(listContainer);
  }

  const editButton = document.createElement("button");
  editButton.classList.add("noteEdit");
  editButton.id = "noteEdit_" + note.id;
  editButton.innerHTML = "edytuj";
  editButton.addEventListener("click", editNote(note.id));
  note.appendChild(editButton);

  if (pinned) {
    notesPinned.appendChild(note);
  } else {
    notesToDo.appendChild(note);
  }
}

function editNote(id) {
  const editButton = document.querySelector(".noteEdit");
  const temp = document.getElementById("id");

  // editButton.addEventListener("click", function () {
  //   showNoteForm();
  // });
}

function showNoteForm(title, content, color, pinned, reminder, tags, list) {
  document.querySelector(".notesForm").style.display = "block";
  document.getElementById("form_noteTitle").focus();
}

function closeNoteForm() {
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

  createNote(title, content, color, pinned, reminderDate, tags, list);
  clearValues();
  closeNoteForm();
}

document
  .querySelector(".formLabels")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    displayForm();
  });

search.addEventListener("input", searchNotes);
