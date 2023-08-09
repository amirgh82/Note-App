const $ = document

const addBox = $.querySelector('.add-box'),
    popupBox = $.querySelector('.popup-box'),
    popupTitle = $.querySelector('header p'),
    popupClose = $.querySelector('header i'),
    inputElem = $.querySelector('input'),
    textareaElem = $.querySelector('textarea'),
    buttonElem = $.querySelector('button'),
    wrapperElem = $.querySelector('.wrapper'),
    settings = $.querySelector('.settings')





let isUpdate = false




let notes = []




function generateNotes(notes) {

    $.querySelectorAll('.note').forEach(note => note.remove())


    notes.forEach((note) => {
        wrapperElem.insertAdjacentHTML('beforeend', `<li class="note">
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
                    <li>
                        <i class="uil uil-trash"></i>Delete
                    </li>
                </ul>
            </div>
        </div>
    </li>`)
    })
}





function setNotesInLocalStoreg(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}





function showSetting(element) {
    element.parentElement.classList.add('show')
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






window.addEventListener('load', () => {
    let notes = getLocalStorageNotes()

    generateNotes(notes)
})





window.addEventListener('keyup', (event) => {
    if (event.keyCode === 27) {
        popupBox.classList.remove('show')
    }
})





buttonElem.addEventListener('click', (event) => {
    event.preventDefault()
    let newNote = {
        id: notes.length + 1,
        title: inputElem.value,
        description: textareaElem.value,
        date: getNowDate()
    }

    notes.push(newNote)

    setNotesInLocalStoreg(notes)
    generateNotes(notes)

    inputElem.value = ''
    textareaElem.value = ''
    popupBox.classList.remove('show')
})


function getNowDate() {
    let now = new Date()

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let nowDay = now.getDay()
    let nowMonth = now.getMonth()
    let nowYear = now.getFullYear()
    let dayOfMonth = now.getDate()
    let hours = now.getHours()
    let minuts = now.getMinutes()

    return `${months[nowMonth]} ${dayOfMonth} , ${nowYear} (${days[nowDay]}) - ${hours}:${minuts}`
}