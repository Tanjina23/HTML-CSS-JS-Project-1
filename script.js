// Varaibles
let songIndex = 0;
let audioElement = new Audio("/assets/songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songsItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Shey Je Bosey Achey",
    filePath: "/assets/songs/1.mp3",
    coverpath: "/assets/songs-cover/song-1.png",
  },

  {
    songName: "Nupur",
    filePath: "/assets/songs/2.mp3",
    coverpath: "/assets/songs-cover/song-2.png",
  },

  {
    songName: "Ishq",
    filePath: "/assets/songs/3.mp3",
    coverpath: "/assets/songs-cover/song-3.png",
  },

  {
    songName: "Iraadey",
    filePath: "/assets/songs/4.mp3",
    coverpath: "/assets/songs-cover/song-4.png",
  },

  {
    songName: "See You Again",
    filePath: "/assets/songs/5.mp3",
    coverpath: "/assets/songs-cover/song-5.png",
  },
];

songsItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("title")[0].innerText = songs[i].songName;
});

//Handle Play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

//Listen to Events
audioElement.addEventListener("timeupdate", () => {
  console.log("timeupdate");

  //Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `/assets/songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

//Next Button
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 4) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `/assets/songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

//Previous Button
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `/assets/songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
