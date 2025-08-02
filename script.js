const audio = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-slider");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const playlistItems = document.querySelectorAll("#playlist li");

// ✅ Song information
const songInfo = {
  "songs/song1.mp3": { title: "Song 1", artist: "Artist 1" },
  "songs/song2.mp3": { title: "Song 2", artist: "Artist 2" }
};

// ✅ Keep track of current song index
let currentIndex = 0;
const playlistArray = Array.from(playlistItems);

// ✅ Load initial song info
window.addEventListener("DOMContentLoaded", () => {
  updateSongInfo(audio.src);
});

// ✅ Play / Pause toggle
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "Pause";
  } else {
    audio.pause();
    playBtn.textContent = "Play";
  }
});

// ✅ Update progress bar as song plays
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
});

// ✅ Seek song
progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// ✅ Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// ✅ Update song title & artist dynamically (fixed for full URLs)
function updateSongInfo(src) {
  const fileName = src.split("/").pop();
  const filePath = "songs/" + fileName;

  if (songInfo[filePath]) {
    songTitle.textContent = songInfo[filePath].title;
    artistName.textContent = songInfo[filePath].artist;
  } else {
    songTitle.textContent = "Unknown Song";
    artistName.textContent = "Unknown Artist";
  }
}

// ✅ Update info when a new song is loaded
audio.addEventListener("loadedmetadata", () => {
  updateSongInfo(audio.src);
});

// ✅ Playlist functionality
playlistItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    changeSong(index);
  });
});

// ✅ Change song function
function changeSong(index) {
  currentIndex = index;
  playlistItems.forEach(el => el.classList.remove("active"));
  playlistItems[currentIndex].classList.add("active");

  audio.src = playlistItems[currentIndex].getAttribute("data-src");
  audio.play();
  playBtn.textContent = "Pause";
  updateSongInfo(audio.src);
}

// ✅ Next & Previous buttons
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlistArray.length;
  changeSong(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlistArray.length) % playlistArray.length;
  changeSong(currentIndex);
});

// ✅ Auto-play next song when current ends
audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % playlistArray.length;
  changeSong(currentIndex);
});
