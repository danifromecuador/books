// Book is the class
// book is the instance of Book class
// booksArray is the array that contains all book objects
const addedBooks = document.querySelector('.added-books'); // In this div the html wil be created dinamically
let booksArray = []; // In this array all the new books will be added
let removeButtonArray = []; // It will contain all the remove buttons
const addButton = document.querySelector('.add-button');

// the Book class contains: constructor, add, remove, and print methods
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook() {
    const newTitle = document.querySelector('.add-title'); // User input
    const newAuthor = document.querySelector('.add-author'); // User input
    if (newTitle.value !== '' && newAuthor.value !== '') {
      const book = new Book(newTitle.value, newAuthor.value);
      booksArray.push(book);
      localStorage.setItem('added-books', JSON.stringify(booksArray));
      newTitle.value = '';
      newAuthor.value = '';
    }
  }

  static removeBook(index) {
    booksArray.splice(index, 1);
    localStorage.setItem('added-books', JSON.stringify(booksArray));
  }

  static render() {
    addedBooks.innerHTML = '';
    for (let i = 0; i < booksArray.length; i += 1) {
      const html = `
        <div class="book">
          <div class="book-details">
            <div class="title">${booksArray[i].title}</div>
            <div class="author">${booksArray[i].author}</div>
          </div>
          <div class="remove-container">
            <button class="remove-book">Remove</button>
          </div>
        </div>
      `;
      addedBooks.innerHTML += html;
    }

    // I can't select the remove button before creating one
    // A new remove button is created only after click on Add button
    // A new remove button array is created only after the page renders
    removeButtonArray = document.querySelectorAll('.remove-book');
    for (let i = 0; i < removeButtonArray.length; i += 1) {
      removeButtonArray[i].addEventListener('click', () => {
        Book.removeBook(i);
        Book.render();
      });
    }
  }
}

window.addEventListener('load', () => {
  if (localStorage.getItem('added-books')) {
    booksArray = JSON.parse(localStorage.getItem('added-books'));
    Book.render();
  }
});

addButton.addEventListener('click', () => {
  Book.addBook();
  Book.render();
  removeButtonArray = document.querySelectorAll('.remove-book');
});
