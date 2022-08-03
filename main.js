console.log('connected!')

let container = document.querySelector('#container')
console.log('results div', container)

// let searchBaseUrl = 'https://api.artic.edu/api/v1/artworks/search?q='
let searchBaseUrl = 'https://proxy-itunes-api.glitch.me/search?term='

let searchForm = document.querySelector('#search-form')

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let searchBox = document.querySelector('#search-box')
    let searchUrl = `${searchBaseUrl}${searchBox.value}`
    console.log('search url', searchUrl)
    getSearchResults(searchUrl)
})

function getSearchResults(url) {
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        // response is whatever the fetch returns
        .then(function (response) {
            return response.json()
        })
        // data is whatever the above code returns, in this case response.json()
        .then(function (data) {
            console.log(data.results)
            showSearchResults(data.results)
        })
}

function showSearchResults(songArray) {
  console.log(songArray);

  for (let songRec of songArray) {
    console.log(songRec);
    let songDiv = document.createElement('div');
    songDiv.classList.add('songRec');
    container.appendChild(songDiv);

    let imgDiv = document.createElement('img')
    imgDiv.classList.add('image');
    imgDiv.src = songRec.artworkUrl100;
    songDiv.appendChild(imgDiv);

    let titleDiv = document.createElement('div')
    titleDiv.classList.add('title');
    titleDiv.innerText = songRec.trackName;
    songDiv.appendChild(titleDiv);

    let artistDiv = document.createElement('div');
    artistDiv.classList.add('band');
    artistDiv.innerText = `${songRec.artistName}`;
    songDiv.appendChild(artistDiv);
  }
}
