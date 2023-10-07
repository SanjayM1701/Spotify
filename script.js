console.log("Welcome to Spotify");

// initialize the variables 
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Aayat", filePath: "song/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Aankho Ni Andar", filePath: "song/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Aashiqui Aa Gayi", filePath: "song/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Ashq Na Ho", filePath: "song/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Chura Ke Dil Mera", filePath: "song/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Dosti", filePath: "song/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Ek Sher Ho Tum", filePath: "song/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Hamdard", filePath: "song/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Har Har Shambhu", filePath: "song/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Tum Hi Ho", filePath: "song/10.mp3", coverPath: "covers/10.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle Play/Pause click 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle_play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle_play');
        gif.style.opacity = 0;
    }
})

// Listen to Events 
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `song/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle_play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle_play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle_play');
    masterPlay.classList.add('fa-circle-pause');
})