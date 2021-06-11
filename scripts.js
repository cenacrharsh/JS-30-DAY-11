//get our player
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

//build our functions
function togglePlay() {
  //   if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = this.paused ? "▶" : "⏸";
  toggle.textContent = icon;
}

function skip() {
  //   console.log(this.dataset);
  //   console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  //   console.log(this.name);
  //   console.log(this.value);
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  //   console.log(e);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//hook up the event listeners

//play/pause video
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

//update play/pause buttons
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

//going forward or backward
skipButtons.forEach((button) => button.addEventListener("click", skip));

//sliders
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

//updating progress bar
video.addEventListener("timeupdate", handleProgress);

// scrub
let mousedown = false;
progress.addEventListener("click", scrub);
// progress.addEventListener("mousemove", (e) => {
//   if (mousedown) {
//     scrub(e);
//   }
// });
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
