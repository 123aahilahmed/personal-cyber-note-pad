// Array to store notes
let notes = [];

// Function to render notes
function renderNotes() {
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `
            <p>${note}</p>
            <button class="note-btn" onclick="editNote(${index})">Edit</button>
            <button class="note-btn" onclick="deleteNote(${index})">Delete</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Function to save note
function saveNote() {
    const noteText = document.getElementById("note-text").value;
    if (noteText.trim() !== "") {
        const fileName = prompt("Enter file name:", "note");
        if (fileName !== null) {
            const formattedFileName = fileName.replace(/[^\w\s]/gi, '') + '.txt';
            downloadFile(formattedFileName, noteText);
            notes.push(noteText);
            renderNotes();
            document.getElementById("note-text").value = "";
        }
    } else {
        alert("Please enter a note.");
    }
}

// Function to edit note
function editNote(index) {
    const editedNote = prompt("Edit note:", notes[index]);
    if (editedNote !== null) {
        notes[index] = editedNote;
        renderNotes();
    }
}

// Function to delete note
function deleteNote(index) {
    if (confirm("Are you sure you want to delete this note?")) {
        notes.splice(index, 1);
        renderNotes();
    }
}

// Function to download file
function downloadFile(fileName, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Function to change font size to default (20px)
function setDefaultFontSize() {
    // Get the textarea element
    const textarea = document.getElementById("note-text");

    // Set the cursor position at the beginning
    textarea.setSelectionRange(0, 0);
}

// Call the function to set default font size on page load
window.onload = setDefaultFontSize;

// Initial render
renderNotes();
