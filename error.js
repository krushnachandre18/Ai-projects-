// Typing Animation
const title = "BUGHUNTER AI 🐞";
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

const errorDatabase = {
    c: [
        { pattern: "printff", error: "Typo Error", fix: "Use printf()" },
        { pattern: "pritnf", error: "Typo Error", fix: "Use printf()" },
        { pattern: "if(a=b)", error: "Comparison Error", fix: "Use ==" }
    ],

    java: [
        { pattern: "printn", error: "Java Typo Error", fix: "Use println()" },
        { pattern: "public clas", error: "Class Error", fix: "Use class" },
        { pattern: "mian", error: "Main Error", fix: "Use main()" }
    ],

    python: [
        { pattern: "prnt", error: "Python Typo Error", fix: "Use print()" },
        { pattern: "imput", error: "Input Error", fix: "Use input()" },
        { pattern: "rnage", error: "Range Error", fix: "Use range()" }
    ],

    cpp: [
        { pattern: "coutt", error: "C++ Typo Error", fix: "Use cout" },
        { pattern: "cnn", error: "Input Error", fix: "Use cin" },
        { pattern: "void main", error: "Main Error", fix: "Use int main()" }
    ]
};

function analyzeError() {
    let language = document.getElementById("language").value;
    let code = document.getElementById("codeInput").value.toLowerCase();
    let output = document.getElementById("output");

    output.innerHTML = "<h3>Analyzing...</h3>";

    setTimeout(() => {

        // C Semicolon Check
        if (language === "c") {
            if (code.includes('printf("') && !code.includes('";') && !code.includes(');')) {
                output.innerHTML = `
                    <h2>Semicolon Error</h2>
                    <p><b>Fix:</b> Add ; after printf statement</p>
                `;
                return;
            }

            if (code.includes("return 0") && !code.includes("return 0;")) {
                output.innerHTML = `
                    <h2>Semicolon Error</h2>
                    <p><b>Fix:</b> Add ; after return 0</p>
                `;
                return;
            }
        }

        let errors = errorDatabase[language];

        for (let i = 0; i < errors.length; i++) {
            if (code.includes(errors[i].pattern.toLowerCase())) {
                output.innerHTML = `
                    <h2>${errors[i].error}</h2>
                    <p><b>Fix:</b> ${errors[i].fix}</p>
                `;
                return;
            }
        }

        output.innerHTML = `
            <h2>No Error Found ✅</h2>
            <p>Code looks good.</p>
        `;
    }, 700);
}


// Matrix Background
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
