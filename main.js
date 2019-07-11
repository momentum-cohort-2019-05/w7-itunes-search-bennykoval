const searchField = document.querySelector('#search-field')
const searchButton = document.querySelector('#search-button')
const searchForm = document.querySelector('#search-form')

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let newUrl = makeNewUrl();
    fetch(newUrl)
        .then(response => response.json())

        // .then(data => {displayData(data)})
        .then(data => {console.log(data)})
})

function makeNewUrl() {
    const userInput = searchField.value;
    let uriConverted = encodeURIComponent(userInput);
    let term = `term=${uriConverted}`;
    let attribute = 'attribute=artistTerm';
    let media = 'media=music';
    let entity = 'entity=song';

    return `https://itunes-api-proxy.glitch.me/search?${term}&${media}&${entity}&${attribute}`;
}

// function displayData() {

// }