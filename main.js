let container = document.querySelector('#container');

let searchBaseUrl = 'https://proxy-itunes-api.glitch.me/search?term=';

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let searchBox = document.querySelector('#search-box');
  let urlEnd = searchBox.value.replaceAll(' ', '+');
  if (searchBox.value !== '') {
    let searchUrl = `${searchBaseUrl}${searchBox.value}&limit=20`;
    getSearchResults(searchUrl);
  } else {
    alert('You must enter a search term.')
  }
})

function getSearchResults(url) {
    fetch(url) 
  // response is whatever fetch returns
  .then((response) => {
    if (response.ok) { 
      return response.json();
    }
    return Promise.reject(response); 
  })
  // data is whatever the above code returns, in this case response.json()
  .then(data => {
    let songs = data.results;
    showSearchResults(songs);
  })
  .catch((error) => {
    alert('ERROR! Something went wrong. Please retry your search.\nJust testing here.')
  });
}

function showSearchResults(songArray) {
  if (songArray.length === 0) {
    alert('No results found.');
  } else {
    deleteOldSongs();
    for (let songRec of songArray) {
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
  
      let audioElement = document.querySelector('#musicPlayer');
      let currentSong = document.querySelector('.currentSong');
  
      songDiv.addEventListener('click', playAudio);
      function playAudio() {
        audioElement.src = songRec.previewUrl;
        currentSong.innerText = `Currently playing: ${songRec.trackName} by ${songRec.artistName}.`
      }
    }
  }
}

function deleteOldSongs() {
  const containerDiv = document.getElementById("container");
  while (containerDiv.lastElementChild) {
    containerDiv.removeChild(containerDiv.lastElementChild);
  }
  let audioElement = document.querySelector('#musicPlayer');
  audioElement.src = '';
}

// Testing for fetch failure - result.ok is false
// Should raise an alert
// Uncomment the following line to run the test
// getSearchResults('foobar');
