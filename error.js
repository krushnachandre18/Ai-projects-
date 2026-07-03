const title = "BUGHUNTER AI👿";
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

function compilerOutput(output, msg) {
    output.innerHTML = `<pre>${msg}</pre>`;
}

function analyzeError() {
    let language = document.getElementById("language").value;
    let code = document.getElementById("codeInput").value;
    let output = document.getElementById("output");

    let lines = code.split("\n");

    compilerOutput(output, "Compiling...\n----------------------------");

    setTimeout(() => {

        // C RULES
        if (language === "c") {
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i].toLowerCase();

                if (line.includes("printff")) {
                    compilerOutput(output,
`Compiling...
----------------------------
temp.c:${i+1}: error: implicit declaration of function 'printff'
Fix: Use printf()`);
                    return;
                }

                if (line.includes("printf(") && !line.includes(";")) {
                    compilerOutput(output,
`Compiling...
----------------------------
temp.c:${i+1}: error: expected ';'`);
                    return;
                }

                if (line.includes("scanf(") && !line.includes("&")) {
                    compilerOutput(output,
`Compiling...
----------------------------
temp.c:${i+1}: warning: missing '&' in scanf`);
                    return;
                }

                if (line.includes("if(") && line.includes("=") && !line.includes("==")) {
                    compilerOutput(output,
`Compiling...
----------------------------
temp.c:${i+1}: warning: use '==' instead of '='`);
                    return;
                }

                if (line.includes("/0")) {
                    compilerOutput(output,
`Compiling...
----------------------------
temp.c:${i+1}: error: division by zero`);
                    return;
                }
            }
        }

        compilerOutput(output,
`Compiling...
----------------------------
Build Successful
No errors found.`);
    }, 800);
}
