const keySounds = {
  a: "sounds/boom.wav",
  s: "sounds/clap.wav",
  d: "sounds/hihat.wav",
  f: "sounds/kick.wav",
  g: "sounds/openhat.wav",
  h: "sounds/ride.wav",
  j: "sounds/snare.wav",
  k: "sounds/tink.wav",
  l: "sounds/tom.wav",
};

const startStop = document.querySelector(".startStop");
const addTrack = document.querySelector(".addTrack");
const removeTracks = document.querySelector(".removeTracks");
const howOftenPerMinute = document.querySelector(".howOftenPerMinute");
const metronomCheck = document.querySelector(".metronomCheck");
const loopCheck = document.querySelector(".loopCheck");
const tracks = document.querySelector(".tracks");
let isPlaying = false;
let trackCounter = 3;
let metronomInterval;
let isMetronomOn = false;
let durationTimeouts = [];

addTrack.addEventListener("click", () => {
  const trackNumber = document.createElement("div");
  trackNumber.classList.add(`track${trackCounter}`);

  const recordBtn = document.createElement("button");
  recordBtn.classList.add("recordBtn");
  recordBtn.textContent = "Record track";

  const trackDiv = document.createElement("div");
  trackDiv.classList.add("track");

  for (let i = 0; i < 8; i++) {
    const input = document.createElement("input");
    input.maxLength = 1;
    trackDiv.appendChild(input);
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add(`track${trackCounter++}Check`);

  trackNumber.appendChild(recordBtn);
  trackNumber.appendChild(trackDiv);
  trackNumber.appendChild(checkbox);
  tracks.appendChild(trackNumber);
  followNewPath();
});

removeTracks.addEventListener("click", () => {
  const checkedTracks = tracks.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  checkedTracks.forEach((track) => {
    track.parentElement.remove();
  });
});

metronomCheck.addEventListener("click", () => {
  if (metronomCheck.checked) {
    isMetronomOn = true;
    metronomPlay();
  } else {
    isMetronomOn = false;
    clearInterval(metronomInterval);
  }
});

startStop.addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    startStop.textContent = "Stop";
    playTracks();
  } else {
    isPlaying = false;
    startStop.textContent = "Start";
    stopTracks();
  }
});

function playTracks() {
  const checkedTracks = tracks.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  checkedTracks.forEach((track) => {
    const inputs = track.parentElement.querySelectorAll(".track input");
    let previousTime = 0;
    inputs.forEach((input, index) => {
      const delay = index === 0 ? 0 : parseInt(input.dataset.time);
      durationTimeouts.push(
        setTimeout(() => {
          if (!isPlaying) return;
          const audio = new Audio(keySounds[input.value]);
          audio.play();
        }, previousTime + delay)
      );
      previousTime += delay;
    });
  });

  if (loopCheck.checked && isPlaying) {
    const maxDelay = Array.from(checkedTracks).reduce((max, track) => {
      const trackInputs = track.parentElement.querySelectorAll(".track input");
      return Math.max(
        max,
        Array.from(trackInputs).reduce(
          (sum, input) => sum + parseInt(input.dataset.time),
          0
        )
      );
    }, 0);
    setTimeout(playTracks, maxDelay);
  } else if (!loopCheck.checked) {
    const maxDelay = Array.from(checkedTracks).reduce((max, track) => {
      const trackInputs = track.parentElement.querySelectorAll(".track input");
      return Math.max(
        max,
        Array.from(trackInputs).reduce(
          (sum, input) => sum + parseInt(input.dataset.time),
          0
        )
      );
    }, 0);
    setTimeout(stopTracks, maxDelay);
  }
}

function stopTracks() {
  durationTimeouts.forEach((timeout) => clearTimeout(timeout));
  durationTimeouts = [];
  clearInterval(metronomInterval);
  isPlaying = false;
  startStop.textContent = "Start";
}

function metronomPlay() {
  if (isMetronomOn) {
    metronomInterval = setInterval(() => {
      new Audio(keySounds.a).play();
    }, 60000 / howOftenPerMinute.value);
  }
}

function followNewPath() {
  const recordTracks = document.querySelectorAll(".recordBtn");
  recordTracks.forEach((recordTrack) => {
    recordTrack.addEventListener("click", (e) => {
      const trackInputs = e.target.parentElement
        .querySelector(".track")
        .querySelectorAll("input");

      trackInputs[0].focus();
      let lastTime = Date.now();

      trackInputs.forEach((input, index) => {
        input.addEventListener("input", () => {
          const letter = input.value.toLowerCase();
          if (keySounds.hasOwnProperty(letter)) {
            const audio = new Audio(keySounds[letter]);
            audio.play();
            const currentTime = Date.now();
            input.dataset.time = currentTime - lastTime;
            lastTime = currentTime;
          }
          if (index < trackInputs.length - 1 && input.value.length === 1) {
            trackInputs[index + 1].focus();
          }
        });
      });
    });
  });
}

followNewPath();
