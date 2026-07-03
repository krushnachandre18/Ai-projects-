const title = "BUGHUNTER AI";
let index = 0;
const heading = document.getElementById("typing");

function typeText() {
    if (heading && index < title.length) {
        heading.innerHTML += title.charAt(index);
        index++;
        setTimeout(typeText, 100);
    }
}
typeText();

function analyzeError() {
    let language = document.getElementById("language").value;
    let code = document.getElementById("codeInput").value;
    let output = document.getElementById("output");

    output.innerHTML = "<h3>Analyzing...</h3>";

    setTimeout(() => {
        let lines = code.split("\n");

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].toLowerCase();

            if (language === "c" && line.includes("printff")) {
                output.innerHTML = `
                    <h2>Typo Error</h2>
                    <p>Line: ${i + 1}</p>
                    <p>Reason: printff invalid</p>
                    <p>Fix: Use printf()</p>
                    <pre>${code.replace(/printff/g, "printf")}</pre>
                `;
                return;
            }

            if (language === "java" && line.includes("system.out.printn")) {
                output.innerHTML = `
                    <h2>Java Error</h2>
                    <p>Line: ${i + 1}</p>
                    <p>Reason: printn invalid</p>
                    <p>Fix: Use println()</p>
                    <pre>${code.replace(/printn/g, "println")}</pre>
                `;
                return;
            }
        }

        output.innerHTML = `
            <h2>No Error Found</h2>
            <p>Code looks good.</p>
        `;
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
        ctx.fillStyle = "rgba(0,0,0,0.05)";
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
