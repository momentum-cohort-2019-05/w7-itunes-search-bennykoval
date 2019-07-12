// const searchButton = document.querySelector('#search-button')
const searchForm = document.querySelector('#search-form')
const musicPlayer = document.querySelector('#audio-player')


function musicNode (music) {
    const musicDiv = document.createElement('div');
    musicDiv.classList.add('music');
    musicDiv.innerHTML = `
        <ul class="detail-list">
            <li class="list-item img"><img id="img-clicky" data-preview="${music.previewUrl}" src=${music.artworkUrl100}></li>
            <li class="list-item title">${music.trackName}</li>
            <li class="list-item artist">${music.artistName}</li>
        </ul>
    `
    return musicDiv;
}

function makeNewUrl() {
    const searchField = document.querySelector('#search-field')
    const userInput = searchField.value;
    let uriConverted = encodeURIComponent(userInput);
    let term = `term=${uriConverted}`;
    let attribute = 'attribute=artistTerm';
    let media = 'media=music';
    let entity = 'entity=song';

    return `https://itunes-api-proxy.glitch.me/search?${term}&${media}&${entity}&${attribute}`;
}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const resultsDiv = document.querySelector('#search-results');

    let newUrl = makeNewUrl();
    fetch(newUrl)
        .then(response => response.json())

        // .then(data => {musicNode(data)})
        // .then(data => {console.log(data)})
        .then(function (data) {
            resultsDiv.innerHTML = ''
            for (let music of data.results) {
              resultsDiv.appendChild(musicNode(music))
            }
        })
})

document.querySelector('#search-results').addEventListener('click', function (event) {
    if (event.target && event.target.matches('#img-clicky')) {
        musicPlayer.src = event.target.dataset.preview;
        musicPlayer.autoplay = "true";
    }
})