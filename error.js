const title = "BUGHUNTER AI";
let index = 0;
const heading = document.getElementById("typing");

function typeText() {
    if (heading && index < title.length) {
        heading.innerHTML += title.charAt(index);
        index++;
        setTimeout(typeText, 120);
    }
}
typeText();

function analyzeError() {
    let language = document.getElementById("language").value;
    let code = document.getElementById("codeInput").value.toLowerCase();
    let output = document.getElementById("output");

    output.innerHTML = "<h3>Analyzing...</h3>";

    setTimeout(() => {
        if (language === "c" && code.includes("printff")) {
            output.innerHTML = `
                <h2>Typo Error</h2>
                <p>Language: C</p>
                <p>Reason: printff invalid</p>
                <p>Fix: Use printf()</p>`;
        }
        else if (language === "java" && code.includes("system.out.printn")) {
            output.innerHTML = `
                <h2>Java Error</h2>
                <p>Language: Java</p>
                <p>Fix: Use println()</p>`;
        }
        else {
            output.innerHTML = `
                <h2>No Error Found</h2>
                <p>Code looks good.</p>`;
        }
    }, 800);
}

const canvas = document.getElementById("particles");

if (canvas) {
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
}
