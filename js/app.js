// if the click event fires on the search button, data is fetched and displayed based on the search text provided by the users
document.getElementById('search-button').addEventListener('click', () => {
    // collect the search text from users
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear the input from the search field
    searchField.value = '';

    document.getElementById('number-of-results').innerHTML = '';

    // showing loading spinner when searching for a book
    document.getElementById('spinner-grow').style.display = 'block';

    // clear previous content found for a search
    document.getElementById('books-container').innerHTML = '';

    // request data from api
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displayBooks(data.docs, data.numFound))
        .catch(error => displayError(error));
});

// show search results
const displayBooks = (books, resultsFound) => {
    // select a container element inside which all the searched books will be shown
    const booksContainer = document.getElementById('books-container');

    // loop through all the elements of the array object found from api response
    books.forEach((book) => {
        let imageUrl;

        // if the cover_i property exists use that, otherwise use a default image
        if (book.cover_i) {
            imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        } else {
            imageUrl = `../images/book-cover.jpg`;
        }

        // create a div element that includes details of a single book
        const aBook = document.createElement('div');
        aBook.classList.add('col');

        aBook.innerHTML = `
        <div class="card h-100">
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">${book.title ? book.title : 'Unknown'}</h4>
                <span class="card-text"><b>Author:</b> ${book.author_name ? book.author_name[0] : 'Unknown'}</span><br/>
                <span class="card-text"><b>Publisher:</b> ${book.publisher ? book.publisher[0] : 'Unknown'}</span><br/>
                <span class="card-text"><b>First publishing year:</b> ${book.first_publish_year ? book.first_publish_year : 'Unknown'}</span><br/>
                <span class="card-text"><b>Language:</b> ${book.language ? book.language[0] : 'Unknown'}</span>
            </div>
        </div>
        `;
        // every time a single book is pushed into the booksContainer as a child
        booksContainer.appendChild(aBook);
    });

    // loading spinner goes out as soon as data is loaded and displayed
    document.getElementById('spinner-grow').style.display = 'none';

    // the number of results found for the searched text is shown here
    document.getElementById('number-of-results').innerHTML = books.length ? `${books.length} of ${resultsFound} reuslts shown.` : `<span class="text-warning">No result found. Please enter an appropriate book name</span>`;
};

// error handler
const displayError = error => {
    console.log(error);
};