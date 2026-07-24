
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let title = document.getElementById("title");
let content = document.getElementById("content");
let addBtn = document.getElementById("addBtn");
let notesContainer = document.getElementById("notesContainer");
let search=document.getElementById("search");
let themeBtn = document.getElementById("themeBtn");
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️ Light Mode"; 
}


themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️ Light Mode"; 
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.textContent = "🌙 Dark Mode"; 
        localStorage.setItem("theme", "light");
    }
});


addBtn.addEventListener("click", () => {

    if(title.value.trim() === "" || content.value.trim() === ""){
        alert("Please enter both title and content for the note.");
        return;
    }

    let newNote={
        title: title.value,
        content: content.value
    };

    notes.push(newNote);
    saveAndRender();
    title.value = "";
    content.value = "";

});

search.addEventListener("input", () => {
        let searchTerm = search.value.toLowerCase();
        let notes = document.querySelectorAll(".note");
        notes.forEach(note => {
            let noteTitle = note.querySelector("h3").textContent.toLowerCase();
            let noteContent = note.querySelector("p").textContent.toLowerCase();
            if (noteTitle.includes(searchTerm) || noteContent.includes(searchTerm)) {
                note.style.display = "";
            } else {
                note.style.display = "none";
            }
        });
    });

function displayNotes(){
    notesContainer.innerHTML = "";
    notes.forEach((note,index) => {
        let noteElement = document.createElement("div");
        noteElement.classList.add("note");

        let noteTitle = document.createElement("h3");
        noteTitle.textContent = note.title;

        let noteContent = document.createElement("p");
        noteContent.textContent = note.content;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        deleteBtn.addEventListener("click", () => {
            notes.splice(index, 1);
            saveAndRender();
        });

        editBtn.addEventListener("click", () => {
            title.value = note.title;
            content.value = note.content;
            notes.splice(index, 1);
            saveAndRender();
        });

        noteElement.appendChild(noteTitle);
        noteElement.appendChild(noteContent);
        noteElement.appendChild(editBtn);
        noteElement.appendChild(deleteBtn);
        notesContainer.appendChild(noteElement);
    });
}

function saveAndRender() {
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

displayNotes();