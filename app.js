// Start selecting elements from dom
const $ = document
const addBox = $.querySelector('.add-box'),
    popupBox = $.querySelector('.popup-box '),
    popupTitle = $.querySelector('header p'),
    popupClose = $.querySelector('header i'),
    inputElem = $.querySelector('input'),
    textareaElem = $.querySelector('textarea'),
    buttonElem = $.querySelector('button'),
    wrapperElem = $.querySelector('.wrapper')
// Finish selecting elements from dom

// Initial values
let isUpdate = false
let updateID = null
let notes = []
// Initial values

// Start clicking codes to show the medal
addBox.addEventListener('click', showModal)
// Finish clicking codes to show the medal

// Start click codes to add or edit note
buttonElem.addEventListener('click', () => {

    if (isUpdate) {

        let allNotes = getLocalStorageNotes()

        allNotes.some((note, index) => {
            if (index === updateID) {
                note.title = inputElem.value
                note.description = textareaElem.value
            }
        })

        setNotesInLocalStorage(allNotes)
        generateNotes(allNotes)
        closeModal()
        clearInputs()

        isUpdate = false
    } else {
        let newNote = {
            id: notes.length + 1,
            title: inputElem.value,
            description: textareaElem.value,
            date: getNowDate()
        }

        notes.push(newNote)
        setNotesInLocalStorage(notes)
        closeModal()
        generateNotes(notes)
        clearInputs()
    }

})
// Finish click codes to add or edit note

// Start the medal display function
function showModal(noteID, noteTitle, noteDesc) {
    if (isUpdate) {
        popupTitle.innerHTML = 'Update main note'
        buttonElem.innerHTML = 'Update Note'
        inputElem.value = noteTitle
        textareaElem.value = noteDesc
    } else {
        popupTitle.innerHTML = 'Add a new note'
        buttonElem.innerHTML = 'Add Note'
    }
    inputElem.focus()
    popupBox.classList.add('show')
}
// Finish the medal display function

// The start of the function to get the note registration time
function getNowDate() {
    let now = new Date()

    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let nowDay = now.getDay()
    let nowMonth = now.getMonth()
    let nowYear = now.getFullYear()
    let dayOfMonth = now.getDate()

    // Created_At, Updated_At

    return `${months[nowMonth]} ${dayOfMonth}, ${nowYear} (${days[nowDay]})` // April 12, 2022 (Tuesday)
}
// The finisg of the function to get the note registration time

// Start the function to clear the inputs
function clearInputs() {
    inputElem.value = ''
    textareaElem.value = ''
}
// Finish the function to clear the inputs

// Start the function of creating a note in HTML
function generateNotes(notes) {

    $.querySelectorAll('.note').forEach(note => note.remove())

    notes.forEach((note, index) => {
        wrapperElem.insertAdjacentHTML('beforeend', `
        <li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i class="uil uil-ellipsis-h" onclick="showSetting(this)"></i>
            <ul class="menu">
              <li onclick="editNote(${index} , '${note.title}' , '${note.description}')">
                <i class="uil uil-pen"></i>Edit
              </li>
              <li onclick="removeNote(${index})">
                <i class="uil uil-trash"></i>Delete
              </li>
            </ul>
          </div>
        </div>
      </li>
        `)
    })
}
// Finish the function of creating a note in HTML

// Start the note delete function
function removeNote(noteIndex) {

    let deleted = confirm('Are you sure to delete note?!')

    if (deleted) {
        let newNotes = getLocalStorageNotes()

        newNotes.splice(noteIndex, 1)
        setNotesInLocalStorage(newNotes)
        generateNotes(newNotes)
    }
}
// Finish the note delete function

// Start the note editing function
function editNote(noteID, noteTitle, noteDesc) {

    isUpdate = true

    showModal(noteID, noteTitle, noteDesc)

    let allNotes = getLocalStorageNotes()

    updateID = noteID

}
// Finish the note editing function

// Start function to view note settings
function showSetting(el) {
    el.parentElement.classList.add('show')

    document.addEventListener('click', (event) => {
        if (event.target.tagName !== 'I' || event.target != el) {
            el.parentElement.classList.remove('show')
        }
    })
}
// Finish function to view note settings

// Starting the function of receiving notes from local storage
function getLocalStorageNotes() {
    let localStorageNotes = localStorage.getItem('notes')

    if (localStorageNotes) {
        notes = JSON.parse(localStorageNotes)
    } else {
        notes = []
    }

    return notes
}
// Finishing the function of receiving notes from local storage

// Starting the note recording function from local storage
function setNotesInLocalStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}
// Finishing the note recording function from local storage

// Start the function to close the medal
function closeModal() {
    popupBox.classList.remove('show')
}
// Finish the function to close the medal

// Commencement of medal closing event
popupClose.addEventListener('click', closeModal)
// Commencement of medal closing event

// The start of the event of receiving notes when the page is loaded
window.addEventListener('load', () => {
    let notes = getLocalStorageNotes()
    generateNotes(notes)
})
// The finish of the event of receiving notes when the page is loaded

// Commencement of medal closing event
window.addEventListener('keyup', event => {

    if (event.key === 'Escape') {
        closeModal()
    }

})
// Commencement of medal closing event