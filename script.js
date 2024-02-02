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

function addBook() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  // 入力値の取得
  const newTitle = titleInput.value.trim();
  const newAuthor = authorInput.value.trim();

  // 入力が空の場合は処理を中止
  if (!newTitle || !newAuthor) {
    alert('Please fill in both title and author.');
    return;
  }

  // JSONファイルから既存の本の情報を取得
  fetch('books.json')
    .then(response => response.json())
    .then(data => {
      // 新しい本を追加
      data.push({
        title: newTitle,
        author: newAuthor
      });

      // 更新した本の情報をJSONファイルに保存
      saveBooksToJson(data);

      // 登録が完了した旨のメッセージを表示
      alert('Book added successfully.');

      // 入力欄をクリア
      titleInput.value = '';
      authorInput.value = '';
    })
    .catch(error => {
      console.error('Error fetching books.json:', error);
    });
}

function saveBooksToJson(data) {
  // JSONファイルに本の情報を保存
  fetch('books.json', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .catch(error => {
    console.error('Error saving books.json:', error);
  });
}