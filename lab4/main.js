const addNote = document.querySelector(".addNote");
const search = document.querySelector(".search");
const notesPinned = document.querySelector(".notesPinned");
const notesToDo = document.querySelector(".notesToDo");
const notesDone = document.querySelector(".notesDone");
let id = 1;

createNote("Title", "Content", "red", false, null, false);

function displayForm() {}

function createNote(title, content, color, pinned, reminderDate, isList) {
  const note = document.createElement("div");
  note.style.minHeight = "200 px";
  note.className = "note";
  note.id = id++;

  const noteTitle = document.createElement("input");
  noteTitle.className = "noteTitle";
  noteTitle.value = title;

  const noteContent = document.createElement("div");
  noteContent.className = "noteContent";
  if (isList) {
    const list = document.createElement("ul");
    list.innerHTML = content;
    noteContent.appendChild(list);
  } else {
    noteContent.innerHTML = content;
  }

  const noteColor = document.createElement("div");
  noteColor.className = "noteColor";
  noteColor.style.backgroundColor = color;

  const notePinned = document.createElement("input");
  notePinned.className = "notePinned";
  if (pinned) {
    notePinned.type = "checkbox";
    notePinned.checked = true;
  }

  if (reminderDate != null) {
    const reminderDate = document.createElement("input");
    reminderDate.className = "reminderDate";
    reminderDate.type = "date";
    reminderDate.value = reminderDate;
    note.appendChild(reminderDate);
  }

  note.appendChild(noteTitle);
  note.appendChild(noteContent);
  note.appendChild(noteColor);
  note.appendChild(notePinned);

  if (pinned) {
    notesPinned.appendChild(note);
  } else {
    notesToDo.appendChild(note);
  }
}
