<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Jade’s Easter Egg Hunt 🥚</title>

<style>
  :root {
    --pink: #f7c6d0;
    --peach: #ffe0b5;
    --cream: #fffaf2;
    --yellow: #ffb703;
    --text: #333;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    background: linear-gradient(270deg, var(--pink), var(--peach), var(--cream));
    background-size: 600% 600%;
    animation: bgMove 20s ease infinite;
    color: var(--text);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    overflow: hidden;
  }

  @keyframes bgMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .card {
    background: white;
    border-radius: 22px;
    padding: 28px;
    max-width: 360px;
    width: 90%;
    box-shadow: 0 20px 45px rgba(0,0,0,0.12);
    animation: cardIn 0.6s ease;
  }

  @keyframes cardIn {
    from {
      opacity: 0;
      transform: translateY(25px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  h1 {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 20px;
    white-space: pre-line;
  }

  .progress {
    height: 8px;
    background: #eee;
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 18px;
  }

  .progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--yellow), #ffd166);
    transition: width 0.6s ease;
  }

  button {
    background: var(--yellow);
    border: none;
    border-radius: 999px;
    padding: 14px 26px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 8px 18px rgba(0,0,0,0.18);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  button:hover {
    transform: translateY(-1px);
  }

  button:active {
    transform: scale(0.94);
    box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  }

  .egg {
    position: absolute;
    font-size: 2rem;
    opacity: 0.18;
    animation: float 12s ease-in-out infinite;
  }

  .egg:nth-child(1) { left: 12%; bottom: 10%; animation-delay: 0s; }
  .egg:nth-child(2) { left: 75%; bottom: 12%; animation-delay: 4s; }
  .egg:nth-child(3) { left: 45%; bottom: 6%; animation-delay: 8s; }

  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-45px); }
    100% { transform: translateY(0); }
  }
</style>
</head>

<body>

<div class="egg">🥚</div>
<div class="egg">🐣</div>
<div class="egg">🥚</div>

<div class="card" id="app">
  <h1>🐣 Jade’s Easter Adventure</h1>
  <div class="progress"><div class="progress-bar" id="bar"></div></div>
  <p>Hi Jade 🌸  
A small adventure awaits you.  
Follow the clues, trust your instincts…  
and enjoy the treats along the way.</p>
  <button onclick="nextClue()">Start the Hunt</button>
</div>

<script>
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();

  o.connect(g);
  g.connect(audioCtx.destination);

  if (type === "next") {
    o.frequency.value = 520;
    g.gain.value = 0.08;
  } else if (type === "final") {
    o.frequency.value = 740;
    g.gain.value = 0.1;
  }

  o.start();
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
  o.stop(audioCtx.currentTime + 0.5);
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
    text: "I glow at night, I steal your sight,\n“One more episode” turns into night.\nIf chocolate hid where stories are told,\nLook where the comfort is bought and sold."
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
  const bar = document.getElementById("bar");

  if (index < clues.length) {
    bar.style.width = `${(index / (clues.length - 1)) * 100}%`;
    playSound(index === clues.length - 1 ? "final" : "next");

    app.classList.remove("card");
    void app.offsetWidth;
    app.classList.add("card");

    app.innerHTML = `
      <h1>${clues[index].title}</h1>
      <div class="progress"><div class="progress-bar" id="bar" style="width:${(index / (clues.length - 1)) * 100}%"></div></div>
      <p>${clues[index].text}</p>
      ${index < clues.length - 1 ? '<button onclick="nextClue()">Next clue</button>' : ''}
    `;
  }
}
</script>

</body>
</html>
