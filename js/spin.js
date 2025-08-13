let players = [];
const truths = [
  "What's your biggest fear?",
  "Who was your first crush?",
  "Have you ever lied to your best friend?",
  "What is the most embarrassing thing you've done?",
  "When is your first love?",
  "Have you ever confessed your feeling to someone?",
  "If you will have to date with someone,what is your type?",
  "If you have to kiss someone in this game,who you want to kiss?"
];
const dares = [
  "Do 10 pushups.",
  "Sing a song loudly.",
  "Dance for 30 seconds.",
  "Talk in a funny voice for 1 minute."
];

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
let startAngle = 0;
let spinAngle = 0;
let spinSpeed = 0;
let spinning = false;
let chosenPlayer = "";

function addPlayer() {
  const name = document.getElementById("playerName").value.trim();
  if (name && !players.includes(name)) {
    players.push(name);
    document.getElementById("playerName").value = "";
    updatePlayerList();
    drawWheel();
  }
}

function updatePlayerList() {
  document.getElementById("playerList").textContent = "Players: " + players.join(", ");
}

// Draw the Wheel
function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (players.length === 0) return;
  let arc = (2 * Math.PI) / players.length;
  for (let i = 0; i < players.length; i++) {
    let angle = startAngle + i * arc;
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, angle, angle + arc);
    ctx.fillStyle = i % 2 === 0 ? "#f39c12" : "#3498db";
    ctx.fill();
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(players[i], 140, 10);
    ctx.restore();
  }
   ctx.beginPath();
  ctx.moveTo(150 - 10, 10);
  ctx.lineTo(150 + 10, 10);
  ctx.lineTo(150, 40);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
}
function spinWheel() {
  if (players.length === 0) {
    alert("Please add at least one player!");
    return;
  }
  if (spinning) return; // prevent multiple spins
  spinSpeed = Math.random() * 10 + 15; // initial speed
  spinning = true;
  rotateWheel();
}

// Animation loop
function rotateWheel() {
  spinSpeed *= 0.97; // slow down
  if (spinSpeed <= 0.5) {
    spinning = false;
    pickWinner();
    return;
  }

  startAngle += (spinSpeed * Math.PI) / 180;
  drawWheel();
  requestAnimationFrame(rotateWheel);
}

// Pick Winner based on final angle
function pickWinner() {
  let arc = (2 * Math.PI) / players.length;
  let pointerAngle = (3 * Math.PI) / 2; 
  let effectiveAngle = (pointerAngle - startAngle) % (2 * Math.PI);
  if (effectiveAngle < 0) effectiveAngle += 2 * Math.PI;
  let index = Math.floor(effectiveAngle / arc) % players.length;
  
  chosenPlayer = players[index];
  document.getElementById("result").textContent = `${chosenPlayer} is chosen!`;
  document.getElementById("truthDareBtns").style.display = "block";
}
function chooseTruth() {
  let q = truths[Math.floor(Math.random() * truths.length)];
  document.getElementById("result").textContent = `${chosenPlayer}, your Truth: ${q}`;
}

function chooseDare() {
  let d = dares[Math.floor(Math.random() * dares.length)];
  document.getElementById("result").textContent = `${chosenPlayer}, your Dare: ${d}`;
}

drawWheel();
