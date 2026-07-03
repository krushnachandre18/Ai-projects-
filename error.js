const title = "BUGHUNTER AI👿";
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
        { pattern: "scanf(", error: "Input Check", fix: "Check scanf syntax" },
        { pattern: "if(a = b)", error: "Comparison Error", fix: "Use ==" },
        { pattern: "pritnf", error: "Typo Error", fix: "Use printf()" },
        { pattern: "main()", error: "Main Check", fix: "Use int main()" },
        { pattern: "printf(hello)", error: "Quotes Error", fix: "Use quotes" },
        { pattern: "#include<stdio.h", error: "Header Error", fix: "Missing >" },
        { pattern: "return", error: "Check Return", fix: "Check syntax" },
        { pattern: "int a =", error: "Syntax Check", fix: "Check semicolon" },
        { pattern: "for(", error: "Loop Check", fix: "Check syntax" }
    ],

    java: [
        { pattern: "printn", error: "Java Typo Error", fix: "Use println()" },
        { pattern: "public clas", error: "Class Error", fix: "Use class" },
        { pattern: "mian", error: "Main Error", fix: "Use main()" },
        { pattern: "system.out", error: "Case Error", fix: "Use System.out" },
        { pattern: "scanner", error: "Scanner Error", fix: "Check Scanner syntax" },
        { pattern: "if(a = b)", error: "Comparison Error", fix: "Use ==" },
        { pattern: "int a = \"", error: "Datatype Error", fix: "String in int not allowed" },
        { pattern: "println(hello)", error: "Quotes Error", fix: "Use quotes" },
        { pattern: "public static voi", error: "Method Error", fix: "Use void" },
        { pattern: "new scanner", error: "Scanner Error", fix: "Use Scanner" }
    ],

    python: [
        { pattern: "prnt", error: "Python Typo Error", fix: "Use print()" },
        { pattern: "imput", error: "Input Error", fix: "Use input()" },
        { pattern: "rnage", error: "Range Error", fix: "Use range()" },
        { pattern: "improt", error: "Import Error", fix: "Use import" },
        { pattern: "leng(", error: "Length Error", fix: "Use len()" },
        { pattern: "if x = ", error: "Comparison Error", fix: "Use ==" },
        { pattern: "print(hello)", error: "Quotes Error", fix: "Use quotes" },
        { pattern: "true", error: "Boolean Error", fix: "Use True" },
        { pattern: "false", error: "Boolean Error", fix: "Use False" },
        { pattern: "while x <", error: "Syntax Check", fix: "Check colon" }
    ],

    cpp: [
        { pattern: "coutt", error: "C++ Typo Error", fix: "Use cout" },
        { pattern: "cnn", error: "Input Error", fix: "Use cin" },
        { pattern: "void main", error: "Main Error", fix: "Use int main()" },
        { pattern: "end;", error: "Endl Error", fix: "Use endl" },
        { pattern: "#include<iostream", error: "Header Error", fix: "Missing >" },
        { pattern: "if(a = b)", error: "Comparison Error", fix: "Use ==" },
        { pattern: "cout << hello", error: "Quotes Error", fix: "Use quotes" },
        { pattern: "cin <<", error: "Operator Error", fix: "Use >>" },
        { pattern: "std:cout", error: "Namespace Error", fix: "Use std::cout" },
        { pattern: "using namespace", error: "Namespace Check", fix: "Check syntax" }
    ]
};

function analyzeError() {
    let language = document.getElementById("language").value;
    let code = document.getElementById("codeInput").value.toLowerCase();
    let output = document.getElementById("output");

    output.innerHTML = "<h3>Analyzing...</h3>";

    setTimeout(() => {
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
            <h2>No Error Found</h2>
            <p>Code looks good.</p>
        `;
    }, 700);
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

    for (let i = 0; i < columns; i++) drops[i] = 1;

    function drawMatrix() {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff99";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 33);
}
