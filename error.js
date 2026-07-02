// Typing Animation
const title = "BUGHUNTER AI";
let index = 0;
const heading = document.getElementById("typing");

function typeText() {
    if (index < title.length) {
        heading.innerHTML += title.charAt(index);
        index++;
        setTimeout(typeText, 120);
    }
}
typeText();


// Analyze Function
function analyzeError() {
    let code = document.getElementById("codeInput").value;
    let output = document.getElementById("output");

    output.innerHTML = "<h3>Analyzing...</h3>";

    fetch("/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: code })
    })
    .then(res => res.json())
    .then(data => {
        output.innerHTML = `
            <div class="result-card">
                <h2>${data.error}</h2>
                <p><b>Reason:</b> ${data.reason}</p>
                <p><b>Fix:</b> ${data.fix}</p>
            </div>
        `;

        output.style.transform = "scale(1.05)";
        setTimeout(() => {
            output.style.transform = "scale(1)";
        }, 300);
    })
    .catch(err => {
        output.innerHTML = "<h2>Backend not connected ❌</h2>";
    });
}


// Particles Animation
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "#00ff99";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 80; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let particle of particlesArray) {
        particle.update();
        particle.draw();
    }

    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});
