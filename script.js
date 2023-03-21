const addedBooks = document.querySelector('.added-books'); // In this div the html wil be created dinamically
const books = []; // In this array all the new books will be added
let removeButton = [];
function add() {
  const newTitle = document.querySelector('.add-title'); // User input
  const newAuthor = document.querySelector('.add-author'); // User input
  if (newTitle.value !== '' && newAuthor.value !== '') {
    books.push({
      title: newTitle.value,
      author: newAuthor.value,
    });
    newTitle.value = '';
    newAuthor.value = '';
  }
}

function remove(index) {
  books.splice(index, 1);
}

function print() {
  addedBooks.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const html = `
      <div class="book">
        <div class="book-details">
          <div class="title">${books[i].title}</div>
          <div class="author">${books[i].author}</div>
        </div>
        <div class="remove-container">
          <button class="remove-number">Remove</button>
        </div>
      </div>
    `;
    addedBooks.innerHTML += html;
  }
  removeButton = document.querySelectorAll('.remove-number');
  for (let i = 0; i < books.length; i += 1) {
    removeButton[i].addEventListener('click', () => {
      remove(i);
      print();
    });
  }
}

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', () => {
  add();
  print();
});
