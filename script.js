"use strict";

const myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
}

Book.prototype.convertToHtml = function(index) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const pAuthor = document.createElement("p");
    pAuthor.textContent = `Autor: ${this.author}`;

    const h3Title = document.createElement("h3");
    h3Title.textContent = `Titulo: ${this.title}`;

    const pPages = document.createElement("p");
    pPages.textContent = `Paginas: ${this.pages}`;

    const pRead = document.createElement("p");
    pRead.textContent = `Leido: ${this.read ? "Si" : "No"}`;

    const buttonRead = document.createElement("button");
    buttonRead.textContent = this.read ? "no leído" : "leído";
    buttonRead.classList.add("btn-style")
    buttonRead.dataset.index = index;
    buttonRead.addEventListener("click", onToggleReadStatus)

    bookCard.appendChild(pAuthor);
    bookCard.appendChild(h3Title);
    bookCard.appendChild(pPages);
    bookCard.appendChild(pRead);
    bookCard.appendChild(buttonRead);

    return bookCard;
}

function renderLibrary(book) {
    const libraryContainer = document.getElementById("library-container");
    libraryContainer.innerHTML = ""
    for (let i = 0; i < myLibrary.length; i++) {
        libraryContainer.appendChild(myLibrary[i].convertToHtml(i));
    }
}

function addBookToLibrary({author, title, pages, read}) {
    const book = new Book(author, title, pages, read);
    myLibrary.push(book);
    renderLibrary();
}

const bookForm = {
    container: document.getElementById("add-book-form"),
    fields: {
        author: document.getElementById("author"),
        title: document.getElementById("title"),
        pages: document.getElementById("pages"),
        read: document.getElementById("read"),
    },
    getData() {
        const formData = {};
        for (const [key, element] of Object.entries(this.fields)) {
            formData[key] = element.value;
        };
        formData.read = this.fields.read.checked;
        return formData;
    },
    clearForm() {
        for (const element of Object.values(this.fields)) {
            element.value = "";
        }
        this.fields.read.checked = false;
    }
}


function getBookFormData(event) {
    event.preventDefault();
    const data = bookForm.getData();
    addBookToLibrary(data)
    bookForm.clearForm();
}


function isInsideTheBookForm(element) {
    do {
        if (element.id === bookForm.container.id) {
            return true;
        }
        element = element.parentElement;
    } while(element.parentElement);
    return false;
}

function onShowBookForm(event) {
    if (bookForm.container.classList.contains("hide")) {
        bookForm.container.classList.remove("hide")
    }
    event.stopPropagation();
}

function onHideBookForm(event) {
    if (!bookForm.container.classList.contains("hide") && !isInsideTheBookForm(event.target)) {
        bookForm.container.classList.add("hide")
    }
}

function onToggleReadStatus(event) {
    myLibrary[event.target.dataset.index].toggleReadStatus();
    renderLibrary();
}


document.getElementById("body").addEventListener("click", onHideBookForm)
document.getElementById("toggle-book-form-btn").addEventListener("click", onShowBookForm)
document.getElementById("add-book-form").addEventListener("submit", getBookFormData)

