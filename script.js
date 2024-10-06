const notesContainer = document.querySelector(".notes-container");
const creatBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

// Function to display notes from localStorage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || ""; // Avoid null in case of empty storage
}
showNotes();

// Function to update localStorage
function updatestorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Add new note on button click
creatBtn.addEventListener("click", () => {
    let inputbox = document.createElement("p");
    let img = document.createElement("img");
    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    img.classList.add("delete-icon");
    notesContainer.appendChild(inputbox).appendChild(img);
    updatestorage(); // Update storage after adding new note
});

// Event delegation for delete and edit
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updatestorage(); // Update storage after deleting
    }
});

// Handle keyup event for updating storage dynamically
notesContainer.addEventListener("keyup", function (e) {
    if (e.target.classList.contains("input-box")) {
        updatestorage(); // Update storage on keyup in any editable note
    }
});

// Prevent default behavior of "Enter" key and insert a line break
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        // Insert a line break at the current caret position
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
