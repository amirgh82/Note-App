const $ = document

const addBox = $.querySelector('.add-box'),
    popupBox = $.querySelector('.popup-box'),
    popupTitle = $.querySelector('header p'),
    popupClose = $.querySelector('header i'),
    inputElem = $.querySelector('input'),
    textareaElem = $.querySelector('textarea'),
    buttonElem = $.querySelector('button')

let isUpdate = false

let notes = []

addBox.addEventListener('click', () => {

    if (isUpdate) {
        popupTitle.innerHTML = 'Update main note '
        buttonElem.innerHTML = "Update note"
    } else {
        popupTitle.innerHTML = 'Add a new note '
        buttonElem.innerHTML = "Add note"
    }

    popupBox.classList.add('show')
    inputElem.focus()
})

popupClose.addEventListener('click', () => {
    popupBox.classList.remove('show')
})

function generateNotes(notes) {

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

window.addEventListener('load', () => {
    let notes = getLocalStorageNotes()

    generateNotes(notes)

})