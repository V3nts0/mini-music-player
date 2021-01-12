const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document. getElementById('progress-container');
const currentEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Machine',
        artist: 'Random'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation',
        artist: 'Random'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight',
        artist: 'Random'
    },    {
        name: 'metric-1',
        displayName: 'Front Row',
        artist: 'Metric'
    },
]

// Check if Playing
let isPlaying = false;

// Play 
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause' ,'fa-play')
    playBtn.setAttribute('title', 'Play');
    music.pause();
}
// Play or Pause Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// Update DOM

function loadSong (song) {
    title.textContent= song.displayName;
    artist.textContent =song.artist;
    music.src= `music/${song.name}.mp3`;
    image.src =`img/${song.name}.jpg`;
}

// Curent Song
let songIndex = 0;

// Prev Song 
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song 
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// On Load = Select First Song
 loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
    if(isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progerss bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration 
        const durationMinute =  Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Delay switching duration Element to avoid NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinute}:${durationSeconds}`;
        }
                // Calculate display for current 
        const currentMinute =  Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentEl.textContent = `${currentMinute}:${currentSeconds}`;
    }
}

function setProgressBar (e) {
    const width = this.clientWitdh;
    const clickX = e.offsetX;
    const {duration}  = music;
    music.currentTime = (clickX / width) * duration;
}

// Event LIsteners
 prevBtn.addEventListener('click', prevSong);
 nextBtn.addEventListener('click', nextSong);
 music.addEventListener('timeupdate', updateProgressBar);
 music.addEventListener('ended',nextSong);
 progressContainer.addEventListener('click',setProgressBar);
 