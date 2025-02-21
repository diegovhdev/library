"use strict";

const myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary({author, title, pages, read}) {
    const book = new Book(author, title, pages, read);
    myLibrary.push(book);
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


document.getElementById("body").addEventListener("click", onHideBookForm)
document.getElementById("toggle-book-form-btn").addEventListener("click", onShowBookForm)
document.getElementById("add-book-form").addEventListener("submit", getBookFormData)