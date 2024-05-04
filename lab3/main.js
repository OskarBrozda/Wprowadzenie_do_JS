//sounds
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

//query selectors
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
let durationTimeout = [];

//add tracks
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

//remove tracks
removeTracks.addEventListener("click", () => {
  const checkedTracks = tracks.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  checkedTracks.forEach((track) => {
    track.parentElement.remove();
  });
});

//metronom check
metronomCheck.addEventListener("click", () => {
  if (metronomCheck.checked) {
    metronomPlay();
  } else {
    clearInterval(metronomInterval);
  }
});

//btn start/stop
startStop.addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    startStop.textContent = "Stop";
    const checkedTracks = tracks.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const totalTracks = checkedTracks.length;
    let trackIndex = 0;

    function playNextTrack() {
      if (trackIndex < totalTracks) {
        const track = checkedTracks[trackIndex++];
        const x = track.parentElement.querySelectorAll(".track input");
        x.forEach((e, index) => {
          durationTimeout.push(
            setTimeout(() => {
              const audio = new Audio(keySounds[e.value]);
              audio.play();
            }, 350 * index)
          );
        });
        setTimeout(playNextTrack, 350 * 8); // Waiting prev track finished then next track
      } else {
        if (!loopCheck.checked) {
          clearInterval(metronomInterval);
          durationTimeout.forEach((timeout) => {
            clearTimeout(timeout);
          });
          isPlaying = false;
          startStop.textContent = "Start";
        } else {
          // If loop is checked, play all tracks again
          trackIndex = 0;
          playNextTrack();
        }
      }
    }
  }
});

//metronom play
function metronomPlay() {
  if (isMetronomOn) {
    metronomInterval = setInterval(() => {
      new Audio(keySounds.a).play();
    }, 60000 / howOftenPerMinute.value);
  }
}

//record track
function followNewPath() {
  const recordTracks = document.querySelectorAll(".recordBtn");
  recordTracks.forEach((recordTrack) => {
    recordTrack.addEventListener("click", (e) => {
      const trackInputs = e.target.parentElement
        .querySelector(".track")
        .querySelectorAll("input");

      trackInputs[0].focus();

      trackInputs.forEach((input, index) => {
        input.addEventListener("input", () => {
          const letter = input.value.toLowerCase();
          if (keySounds.hasOwnProperty(letter)) {
            const audio = new Audio(keySounds[letter]);
            audio.play();
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
