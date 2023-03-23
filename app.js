class Books {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  displayBooks() {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';
    this.books.forEach((book) => {
      const li = document.createElement('li');
      li.classList.add('book');
      li.innerHTML = `<div>"${book.title}" by ${book.author}</div>`;
      const removeButton = document.createElement('button');
      removeButton.innerHTML = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(book);
      });
      li.appendChild(removeButton);
      booksList.appendChild(li);
      li.style.listStyleType = 'none';
      const hr = document.createElement('hr');
      booksList.appendChild(hr);
    });
  }

  addBook(title, author) {
    const book = { title, author };
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  removeBook(book) {
    const newBooks = this.books.filter((b) => b.title !== book.title || b.author !== book.author);
    localStorage.setItem('books', JSON.stringify(newBooks));
    this.books = newBooks;
    this.displayBooks();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const books = new Books();
  books.displayBooks();
  const form = document.getElementById('add-book-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    // check if the book is already in the list 
    let booksArrays = [];
    if (localStorage.getItem('books')) {
      booksArrays = JSON.parse(localStorage.getItem('books'));
    }
    for (let i = 0; i < booksArrays.length; i++) {
      if (booksArrays[i].title === title && booksArrays[i].author === author) {
        alert('This book is already in your list');
        return;
      }
    }

    books.addBook(title, author);
    form.reset();
  });
});