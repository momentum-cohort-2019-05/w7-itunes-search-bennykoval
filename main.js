// const searchButton = document.querySelector('#search-button')
const searchForm = document.querySelector('#search-form')
const musicPlayer = document.querySelector('#audio-player')

function musicNode(music) {
    const musicDiv = document.createElement('div');
    musicDiv.classList.add('music');
    if (music.trackName.length >= 20) {
        music.trackName = music.trackName.substring(0, 20) + "..."
    }

    if (music.artistName.length >= 20) {
        music.artistName = music.artistName.substring(0, 20) + "..."
    }

    musicDiv.innerHTML = `
        <ul class="detail-list">
            <li class="list-item" id="img"><img id="img-clicky" class="song-img" data-preview="${music.previewUrl}" src=${music.artworkUrl100}></li>
            <div class="block>
                <li class="list-item" id="title">${music.trackName}</li>
                <li class="list-item" id="artist-but-sad" id="artist">${music.artistName}</li>
            </div>
        </ul>
    `
    return musicDiv;
}

function artistNode(music) {
    const artistDiv = document.createElement('div');
    console.log(music)
    artistDiv.classList.add('music');
    artistDiv.innerHTML = `
        <ul class="detail-list">
            <li class="list-item" id="artist-center" id="artist">${music.artistName}</li>
        </ul>
    `
    return artistDiv;
}

function albumNode(music) {
    const albumDiv = document.createElement('div');
    albumDiv.classList.add('music');
    if (music.collectionName.length >= 20) {
        music.collectionName = music.collectionName.substring(0, 20) + "..."
    }

    if (music.artistName.length >= 20) {
        music.artistName = music.artistName.substring(0, 20) + "..."
    }
    albumDiv.innerHTML = `
        <ul class="detail-list">
            <li class="list-item" id="img"><img id="img-clicky" data-preview="${music.previewUrl}" src=${music.artworkUrl100}></li>
            <div class="block">
                <li class="list-item" id="title">${music.collectionName}</li>
                <li class="list-item" id="artist-but-sad" id="artist">${music.artistName}</li>
            </div>
        </ul>
    `
    return albumDiv;
}
function makeNewUrl(entity) {
    const searchField = document.querySelector('#search-field')
    const userInput = searchField.value;
    let uriConverted = encodeURIComponent(userInput);
    let term = `term=${uriConverted}`;
    // let attribute = 'attribute=artistTerm';
    let media = 'media=music';
    // let entity = 'entity=song';

    return `https://itunes-api-proxy.glitch.me/search?${term}&${media}&entity=${entity}`;
}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const songDiv = document.querySelector('#song-search-results');
    const artistDiv = document.querySelector('#artist-search-results');
    const albumDiv = document.querySelector('#album-search-results')
    const showOnSearch = document.querySelector('#show-on-search')
    const audioPlayerContainer = document.querySelector('.audio-player-container')

    let newUrl = makeNewUrl('song');
    fetch(newUrl)
        .then(response => response.json())

        .then(function (data) {
            showOnSearch.style.display = 'block'
            audioPlayerContainer.style.display = 'flex'
            songDiv.innerHTML = ''
            data.results.length = Math.min(data.results.length, 5)
            for (let music of data.results) {
                    songDiv.appendChild(musicNode(music))
                }
        })


    newUrl = makeNewUrl('musicArtist');
    fetch(newUrl)
        .then(response => response.json())

        .then(function (data) {
            showOnSearch.style.display = 'block'
            artistDiv.innerHTML = ''
            data.results.length = Math.min(data.results.length, 5)
            for (let music of data.results) {
                    artistDiv.appendChild(artistNode(music))
                }
        })

    
    newUrl = makeNewUrl('album');
    fetch(newUrl)
        .then(response => response.json())

        .then(function (data) {
            showOnSearch.style.display = 'block'
            albumDiv.innerHTML = ''
            data.results.length = Math.min(data.results.length, 5)
            for (let music of data.results) {
                    albumDiv.appendChild(albumNode(music))
                }

})

document.querySelector('.search-results').addEventListener('click', function (event) {
    if (event.target && event.target.matches('#img-clicky')) {
        musicPlayer.src = event.target.dataset.preview;
        musicPlayer.autoplay = "true";
    }
  })
})

function calculateTotalValue(length) {
    let minutes = Math.floor(length / 60),
      secondsInt = length - minutes * 60,
      secondsStr = secondsInt.toString(),
      seconds = secondsStr.substr(0, 2),
      time = minutes + ':' + seconds
  
    return time;
  }

function calculateCurrentValue(currentTime) {
let currentHour = parseInt(currentTime / 3600) % 24,
    currentMinute = parseInt(currentTime / 60) % 60,
    secondsLong = currentTime % 60,
    currentSeconds = secondsLong.toFixed(),
    current_time = (currentMinute < 10 ? "0" + currentMinute : currentMinute) + ":" + (currentSeconds < 10 ? "0" + currentSeconds : currentSeconds);

return current_time;
}


function functProgressBar() {
    let player = document.querySelector('#audio-player');
    const { duration, currentTime } = player;
  
    let totalLength = calculateTotalValue(duration);
    document.querySelector('#end-time').innerHTML = totalLength;
    
    const calculatedCurrentTime = calculateCurrentValue(currentTime);
    document.querySelector('#start-time').innerHTML = calculatedCurrentTime;

    let progressBar = document.querySelector('#progress-bar');
    progressBar.value = (currentTime / duration);
    progressBar.addEventListener("click", seek);


    function seek(evt) {
        let percent = evt.offsetX / this.offsetWidth;
        player.currentTime = percent * player.duration;
        progressBar.value = percent / 100;
    }
};

// functProgressBar(jQuery('#audio-player-container').length);