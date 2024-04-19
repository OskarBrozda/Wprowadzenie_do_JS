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
    inputNumber = 0;
    const checkedTracks = tracks.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    checkedTracks.forEach((track) => {
      const x = track.parentElement
        .querySelector(".track")
        .querySelectorAll("input");
      if (!loopCheck.checked) {
        x.forEach((e) => {
          durationTimeout.push(
            setTimeout(() => {
              const audio = new Audio(keySounds[e.value]);
              audio.play();
            }, 350 * inputNumber++)
          );
        });
      } else {
        //tutaj wpisac zeby powtarzalo az loop jest zaznaczony, ale uwaga, zeby nie zaczelo odtwarzac od razu wszystkiego wiec kazde kolejne odtworzenie opoznic!!!
        x.forEach((e) => {
          durationTimeout.push(
            setTimeout(() => {
              const audio = new Audio(keySounds[e.value]);
              audio.play();
            }, 350 * inputNumber)
          );
        });
      }
    });
    if (!loopCheck.checked) {
      setTimeout(() => {
        clearInterval(metronomInterval);
        durationTimeout.forEach((timeout) => {
          clearTimeout(timeout);
        });
        isPlaying = false;
        startStop.textContent = "Start";
      }, 350 * 8);
    }
  } else {
    clearInterval(metronomInterval);
    metronomCheck.checked = false;
    durationTimeout.forEach((timeout) => {
      clearTimeout(timeout);
    });
    isPlaying = false;
    startStop.textContent = "Start";
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
