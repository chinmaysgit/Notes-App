const addbox = document.getElementById("add-box");
const container = document.querySelector(".container");
const popup = document.querySelector(".popup");
const add = document.querySelector(".add");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");
const closepopup = document.querySelector(".closepopup");
const popupTitle = document.querySelector('header p');

let isUpdate = false, updateId;

addbox.addEventListener("click", () => {
    popup.style.display = 'block';
    input.focus();
})

let notes = JSON.parse(localStorage.getItem('notes') || "[]");


closepopup.addEventListener('click', () => {
    popup.style.display = 'none';
    input.value="";
    textarea.value="";
    add.innerText = "Add a note";
    popupTitle.innerText = "Add a new note";
})
add.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = 'none';
    let d = new Date();
    let date;
    let day = d.getDate();
    let month = d.toLocaleString('default', { month: 'long' }).substring(0, 3);
    let year = d.getFullYear();
    date = day + " " + month + " " + year;

    let info = {
        title: input.value,
        desc: textarea.value,
        date: `${day} ${month} ${year}`
    }
    if(!isUpdate){
        notes.push(info);
    }else{
        isUpdate = false;
        notes[updateId] = info;
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
    input.value="";
    textarea.value="";
    
})
const showNotes = () => {
    document.querySelectorAll(".note").forEach(note => {
        note.remove();
    })
    notes.forEach((note,index) => {
        let liTag = `<li class="note">
        <div class="content">
            <p class="title">
                ${note.title}
            </p>
            <span class="details">
                ${note.desc}
            </span>
        </div>
        <div class="bottom">
            <span class="date">
                ${note.date}
            </span>
            <div class="settings">
                <i onclick= "showMenu(this)" class="fa-solid fa-ellipsis">    
                </i>
                <ul class="menu">
                    <li onclick="editNote(${index}, '${note.title}', '${note.desc}')" class="edit-icons edit"><i class="fa-solid fa-pen"></i>Edit</li>
                    <li onclick="deleteNote(${index})" class="edit-icons delete"><i class="fa-solid fa-trash"></i>Delete</li>
                </ul>
            </div>
        </div>
    </li>`
    addbox.insertAdjacentHTML('afterend', liTag);
    });
    
}
function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", (e)=>{
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    })     
}
function deleteNote(noteId){
    notes.splice(noteId,1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}
function editNote(noteId, title, desc){
    popup.style.display = 'block';
    updateId = noteId;
    isUpdate = true;
    input.value = title;
    textarea.value = desc;
    add.innerText = "Update note";
    popupTitle.innerText = "Update a note";
    
}
window.addEventListener('DOMContentLoaded', ()=>{
    showNotes();
})