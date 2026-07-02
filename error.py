from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    code = data.get("code", "").lower()

    if "printff" in code:
        return jsonify({
            "error": "Typo Error",
            "reason": "printff is not a valid function.",
            "fix": "Use printf() instead."
        })

    elif "printf" in code and ";" not in code:
        return jsonify({
            "error": "Syntax Error",
            "reason": "Possible missing semicolon.",
            "fix": "Add semicolon (;) at end of statement."
        })

    elif "if(" in code and "=" in code and "==" not in code:
        return jsonify({
            "error": "Comparison Error",
            "reason": "Assignment operator used inside condition.",
            "fix": "Use == for comparison."
        })

    elif "system.out.printn" in code:
        return jsonify({
            "error": "Java Typo Error",
            "reason": "printn is invalid.",
            "fix": "Use println()."
        })

    elif "null" in code:
        return jsonify({
            "error": "Null Pointer Risk",
            "reason": "Null values may crash program.",
            "fix": "Initialize variable properly."
        })

    else:
        return jsonify({
            "error": "No Known Error Found",
            "reason": "Pattern not found in database.",
            "fix": "Try another code sample."
        })

if __name__ == "__main__":
    app.run(debug=True)