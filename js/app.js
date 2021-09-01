document.getElementById('search-button').addEventListener('click', () => {
    // collect the search text from users
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    // request data from api
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
        .catch(error => console.log(error));
});

// show search results
const displayBooks = books => {
    // console.log(books);
    const booksContainer = document.getElementById('books-container');
    let count = 0;
    books.forEach(book => {
        console.log(book);
        count++;
        let imageUrl
        if (book.cover_i) {
            imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        } else {
            imageUrl = `../images/bookCover.png`;
        }

        const aBook = document.createElement('div');
        aBook.classList.add('col');

        aBook.innerHTML = `
        <div class="card h-100">
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title ? book.title : 'Unknown'}</h5>
                <p class="card-text"><b>Author</b>: ${book.author_name ? book.author_name[0] : 'Unknown'}</p>
                <p><b>First Edition</b>: ${book.first_publish_year ? book.first_publish_year : 'Unknown'}</p>
                <p class="card-text"><b>Publisher</b>: ${book.publisher ? book.publisher[0] : 'Unknown'}</p>
            </div>
        </div>
        `;
        booksContainer.appendChild(aBook);
    });
    document.getElementById('number-of-results').innerText = `Total ${count} reuslts found.`;
};