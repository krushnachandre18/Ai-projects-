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

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff99";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 33);

let language = document.getElementById("language").value;
let language = document.getElementById("language").value;
let code = document.getElementById("codeInput").value.toLowerCase();
if (language === "c" && code.includes("printff")) {
    output.innerHTML = `
    <h2>Typo Error</h2>
    <p>Language: C</p>
    <p>Fix: Use printf()</p>`;
}
else if (language === "java" && code.includes("system.out.printn")) {
    output.innerHTML = `
    <h2>Java Error</h2>
    <p>Fix: Use println()</p>`;
}
let language = document.getElementById("language").value;
let code = document.getElementById("codeInput").value.toLowerCase();
let output = document.getElementById("output");
if (language === "c" && code.includes("printff")) {
    output.innerHTML = `
    <h2>Typo Error</h2>
    <p>Language: C</p>
    <p>Reason: printff invalid</p>
    <p>Fix: Use printf()</p>`;
}
else if (language === "java" && code.includes("system.out.printn")) {
    output.innerHTML = `
    <h2>Java Typo Error</h2>
    <p>Language: Java</p>
    <p>Fix: Use println()</p>`;
}
else {
    output.innerHTML = `
    <h2>No Error Found</h2>
    <p>Code looks good.</p>`;
}
