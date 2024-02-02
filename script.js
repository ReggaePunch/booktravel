document.addEventListener('DOMContentLoaded', function() {
  // JSONファイルから本の情報を読み込む
  fetch('books.json')
    .then(response => response.json())
    .then(data => {
      // 読み込んだ本の情報をトップページに表示
      displayBooks(data);
    })
    .catch(error => {
      console.error('Error fetching books.json:', error);
    });

  function displayBooks(books) {
    const bookList = document.getElementById('bookList');

    // 各本の情報を表示
    books.forEach(book => {
      const bookItem = document.createElement('li');
      bookItem.className = 'bookItem';
      bookItem.innerHTML = `<h2>${book.title}</h2><p>${book.author}</p>`;
      bookList.appendChild(bookItem);
    });
  }
});
