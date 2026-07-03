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
    let code = document.getElementById("codeInput").value.toLowerCase();
    let output = document.getElementById("output");

    let errors = errorDatabase[language];

    for (let i = 0; i < errors.length; i++) {
        if (code.includes(errors[i].pattern.toLowerCase())) {
            output.innerHTML = `
                <h2>${errors[i].error}</h2>
                <p>Fix: ${errors[i].fix}</p>
            `;
            return;
        }
    }

    output.innerHTML = "<h2>No Error Found</h2>";
}
    let language = document.getElementById("language").value;
    let code = document.getElementById("codeInput").value;
    let output = document.getElementById("output");

    let lines = code.split("\n");

    compilerOutput(output, "Compiling...\n----------------------------");

    setTimeout(() => {
        const errorDatabase = {
    java: [
        { pattern: "printn", error: "Java Typo Error", fix: "Use println()" },
        { pattern: "public clas", error: "Class Error", fix: "Use class" },
        { pattern: "mian", error: "Main Method Error", fix: "Use main()" },
        { pattern: "system.out", error: "Case Error", fix: "Use System.out" },
        { pattern: "scanner", error: "Scanner Error", fix: "Check Scanner syntax" },
        { pattern: "=", error: "Possible Assignment Error", fix: "Use == in conditions" },
        { pattern: "int a = \"", error: "Datatype Error", fix: "String cannot go in int" },
        { pattern: "if(", error: "Check if syntax", fix: "Check brackets" },
        { pattern: "println(hello)", error: "Quote Error", fix: "Use quotes" },
        { pattern: "system.out.print", error: "Print Error", fix: "Check syntax" }
    ],

    python: [
        { pattern: "prnt", error: "Python Typo Error", fix: "Use print()" },
        { pattern: "imput", error: "Input Error", fix: "Use input()" },
        { pattern: "rnage", error: "Range Error", fix: "Use range()" },
        { pattern: "improt", error: "Import Error", fix: "Use import" },
        { pattern: "leng", error: "Length Error", fix: "Use len()" },
        { pattern: "if x =", error: "Assignment Error", fix: "Use ==" },
        { pattern: "print(hello)", error: "Quote Error", fix: "Use quotes" },
        { pattern: "true", error: "Boolean Error", fix: "Use True" },
        { pattern: "false", error: "Boolean Error", fix: "Use False" },
        { pattern: "if x >", error: "Check Colon", fix: "Missing :" }
    ],

    cpp: [
        { pattern: "coutt", error: "C++ Typo Error", fix: "Use cout" },
        { pattern: "cnn", error: "Input Error", fix: "Use cin" },
        { pattern: "end;", error: "Endl Error", fix: "Use endl" },
        { pattern: "void main", error: "Main Error", fix: "Use int main()" },
        { pattern: "#include<iostream", error: "Header Error", fix: "Check >" },
        { pattern: "=", error: "Assignment Error", fix: "Use ==" },
        { pattern: "cout << hello", error: "Quote Error", fix: "Use quotes" },
        { pattern: "if(", error: "Check if syntax", fix: "Check brackets" },
        { pattern: "cout", error: "Namespace Error", fix: "Use std::cout or namespace" },
        { pattern: "cin <<", error: "Operator Error", fix: "Use >>" }
    ]
};

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
