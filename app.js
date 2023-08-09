const $ = document

const addBox = $.querySelector('.add-box'),
    popupBox = $.querySelector('.popup-box'),
    popupTitle = $.querySelector('header p'),
    popupClose = $.querySelector('header i'),
    inputElem = $.querySelector('input'),
    textareaElem = $.querySelector('textarea'),
    buttonElem = $.querySelector('button')

    let notes = []

    function getLocalStorageNotes() {
        let localStorageNotes = localStorage.getItem('notes')
    
        if (localStorageNotes) {
            notes = JSON.parse(localStorageNotes)
        } else {
            notes = []
        }
    
        return notes
    
    }
    
    