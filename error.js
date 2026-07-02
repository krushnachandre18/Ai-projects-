const text = "CODE ERROR EXPLAINER";
let i = 0;

function typeEffect() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 100);
  }
}
typeEffect();

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 2,
    speed: Math.random() * 2
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff99";
  
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    
    p.y += p.speed;
    if (p.y > canvas.height) p.y = 0;
  });
  
  requestAnimationFrame(animateParticles);
}
animateParticles();
function analyzeError() {
  let code = document.getElementById("codeInput").value;
  
  document.getElementById("output").innerHTML = "Analyzing...";
  
  fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code: code })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("output").innerHTML = `
            <h2>${data.error}</h2>
            <p><b>Reason:</b> ${data.reason}</p>
            <p><b>Fix:</b> ${data.fix}</p>
        `;
    })
    .catch(error => {
      document.getElementById("output").innerHTML =
        "Backend not connected ❌";
    });
}