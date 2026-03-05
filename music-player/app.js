const tracks = [
  {
    title: "Groovy Vibes",
    artist: "Artist A",
    src: "assets/track1.mp3",
    cover: "assets/covor.jpg",
  },
  {
    title: "Running Night",
    artist: "Artist B",
    src: "assets/track2.mp3",
    cover: "assets/covor1.jpg",
  },
  {
    title: "Gardens-Stylish chin",
    artist: "Artist C",
    src: "assets/track3.mp3",
    cover: "assets/covor2.webp",
  },
  {
    title: "Hype-drill music",
    artist: "Artist D",
    src: "assets/track4.mp3",
    cover: "assets/covor3.jpeg",
  },
  {
    title: "perfect Beauty",
    artist: "Artist E",
    src: "assets/track5.mp3",
    cover: "assets/covor4.png",
  },
];


// GET ELEMENTS
const audio = new Audio();
let currentTrackIndex = 0;

const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const coverImg = document.getElementById("cover");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const muteBtn = document.getElementById("mute");
const volumeSlider = document.getElementById("volume");

const playlistEl = document.getElementById("playlist");

// LOAD TRACK
function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  coverImg.src = track.cover;

  // Highlight active song in playlist
  document.querySelectorAll("#playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

// PLAY & PAUSE
function playTrack() {
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseTrack() {
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  audio.paused ? playTrack() : pauseTrack();
});


// NEXT / PREVIOUS
nextBtn.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
});

prevBtn.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
});

// UPDATE PROGRESS BAR
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent;

  // Update timestamps
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// Seek audio when clicking progress bar
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Format time (mm:ss)
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}


// VOLUME & MUTE
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
  muteBtn.textContent = audio.volume == 0 ? "🔇" : "🔊";
});

muteBtn.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    muteBtn.textContent = "🔊";
  } else {
    audio.muted = true;
    muteBtn.textContent = "🔇";
  }
});


// BUILD PLAYLIST
tracks.forEach((track, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${track.title}</span>
  `;
  li.addEventListener("click", () => {
    currentTrackIndex = index;
    loadTrack(currentTrackIndex);
    playTrack();
  });
  playlistEl.appendChild(li);
});

// KEYBOARD CONTROLS
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case " ":
      e.preventDefault();
      audio.paused ? playTrack() : pauseTrack();
      break;

    case "ArrowRight":
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      loadTrack(currentTrackIndex);
      playTrack();
      break;

    case "ArrowLeft":
      currentTrackIndex =
        (currentTrackIndex - 1 + tracks.length) % tracks.length;
      loadTrack(currentTrackIndex);
      playTrack();
      break;

    case "ArrowUp":
      audio.volume = Math.min(audio.volume + 0.05, 1);
      volumeSlider.value = audio.volume;
      break;

    case "ArrowDown":
      audio.volume = Math.max(audio.volume - 0.05, 0);
      volumeSlider.value = audio.volume;
      break;
  }
});
loadTrack(currentTrackIndex);
