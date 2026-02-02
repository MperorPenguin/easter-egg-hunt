let audioCtx = null;

function playSound(type) {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === "next") {
    osc.frequency.value = 520;
    gain.gain.value = 0.08;
  } else if (type === "final") {
    osc.frequency.value = 740;
    gain.gain.value = 0.1;
  }

  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
  osc.stop(audioCtx.currentTime + 0.5);
}

const clues = [
  {
    title: "🥚 Clue 1",
    text: "I’m not gold, but I’m worth the search,\nI rest where evenings claim their perch.\nA place to sink, a place to stay,\nLook where you sit at end of day."
  },
  {
    title: "🥚 Clue 2",
    text: "I wake you gently, I warm your hands,\nI help you function — part of the plan.\nBefore the day has truly begun,\nI’m filled with something dark… or none."
  },
  {
    title: "🥚 Clue 3",
    text: "I glow at night, I steal your sight,\nOne more episode turns into night.\nIf chocolate hid where stories are told,\nLook where the comfort is bought and sold."
  },
  {
    title: "🥚 Clue 4",
    text: "I spin, I clean, I hum away,\nI eat your socks and money each day.\nNot a place you’d think to explore,\nBut check where the washing waits once more."
  },
  {
    title: "🐰 Adventure Complete",
    text: "You did it, Jade 💛\n\nThe treats are found,\nbut the real treasure is\nhow much you’re loved.\n\nHappy Easter 🐣"
  }
];

let index = -1;

function nextClue() {
  index++;

  const app = document.getElementById("app");
  const progressPercent = (index / (clues.length - 1)) * 100;

  playSound(index === clues.length - 1 ? "final" : "next");

  app.classList.remove("card");
  void app.offsetWidth;
  app.classList.add("card");

  app.innerHTML = `
    <h1>${clues[index].title}</h1>
    <div class="progress">
      <div class="progress-bar" style="width:${progressPercent}%"></div>
    </div>
    <p>${clues[index].text}</p>
    ${index < clues.length - 1 ? `<button onclick="nextClue()">Next clue</button>` : ""}
  `;
}
