const container = document.querySelector('#container');
console.log('container div', container)

// let searchUrl = 'https://api.artic.edu/api/v1/artworks?page=2&limit=100'
// let searchUrl = 'https://itunes.apple.com/search?term=jack+johnson'
let searchUrl = 'https://proxy-itunes-api.glitch.me/search?term=jack+johnson&limit=10'

fetch(searchUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
})
.then(function (response) {
  return response.json();
})
.then(function (data) {
  let songs = data.results;
  showSearchResults(songs);
})

function showSearchResults(songArray) {
  console.log(`songArray:\n${songArray}`);
  for (let songRec of songArray) {
    console.log(songRec);
    let songDiv = document.createElement('div');
    songDiv.classList.add('songRec');
    container.appendChild(songDiv);

    let imgDiv = document.createElement('img')
    imgDiv.classList.add('image');
    imgDiv.src = songRec.artworkUrl100;
    // imgDiv.src = songRec.artistViewUrl;
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