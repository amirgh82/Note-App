const $ = document
const addBox = $.querySelector('.add-box'),
    popupBox = $.querySelector('.popup-box '),
    popupTitle = $.querySelector('header p'),
    popupClose = $.querySelector('header i'),
    inputElem = $.querySelector('input'),
    textareaElem = $.querySelector('textarea'),
    buttonElem = $.querySelector('button'),
    wrapperElem = $.querySelector('.wrapper')

let isUpdate = false

let notes = []

addBox.addEventListener('click', () => {

    if (isUpdate) {
        popupTitle.innerHTML = 'Update main note'
        buttonElem.innerHTML = 'Update Note'
    } else {
        popupTitle.innerHTML = 'Add a new note'
        buttonElem.innerHTML = 'Add Note'
    }
    inputElem.focus()
    popupBox.classList.add('show')
})

buttonElem.addEventListener('click', () => {
    let newNote = {
        title: inputElem.value,
        description: textareaElem.value,
        date: getNowDate()
    }

    notes.push(newNote)
    setNotesInLocalStorage(notes)
    closeModal()
    generateNotes(notes)
    clearInputs()

})

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

function clearInputs() {
    inputElem.value = ''
    textareaElem.value = ''
}

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
              <li>
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

function removeNote(noteIndex) {

    let deleted = confirm('Are you sure to delete note?!')

    if (deleted) {
        let newNotes = getLocalStorageNotes()

        newNotes.splice(noteIndex, 1)
        setNotesInLocalStorage(newNotes)
        generateNotes(newNotes)
    }
}

function showSetting(el) {
    el.parentElement.classList.add('show')
}

function getLocalStorageNotes() {
    let localStorageNotes = localStorage.getItem('notes')

    if (localStorageNotes) {
        notes = JSON.parse(localStorageNotes)
    } else {
        notes = []
    }

    return notes
}

function setNotesInLocalStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

function closeModal() {
    popupBox.classList.remove('show')
}

popupClose.addEventListener('click', closeModal)

window.addEventListener('load', () => {
    let notes = getLocalStorageNotes()
    generateNotes(notes)
})

window.addEventListener('keyup', event => {

    if (event.key === 'Escape') {
        closeModal()
    }

})