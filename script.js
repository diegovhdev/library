
const bookForm = document.getElementById("add-book-form")


function isInsideTheBookForm(element) {
    do {
        if (element.id === bookForm.id) {
            return true;
        }
        element = element.parentElement;
    } while(element.parentElement);
    return false;
}

function onShowBookForm(event) {
    if (bookForm.classList.contains("hide")) {
        bookForm.classList.remove("hide")
    }
    event.stopPropagation();
}

function onHideBookForm(event) {
    if (!bookForm.classList.contains("hide") && !isInsideTheBookForm(event.target)) {
        bookForm.classList.add("hide")
    }
}


document.getElementById("body").addEventListener("click", onHideBookForm)
document.getElementById("toggle-book-form-btn").addEventListener("click", onShowBookForm)