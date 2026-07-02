from flask import Flask, request, jsonify, send_file

app = Flask(__name__)

@app.route("/")
def home():
    return send_file("error.html")

@app.route("/error.css")
def css():
    return send_file("error.css")

@app.route("/error.js")
def js():
    return send_file("error.js")

@app.route("/analyze", methods=["POST"])
def analyze():
    code = request.json.get("code", "").lower()

    if "printff" in code:
        return jsonify({
            "error": "Typo Error",
            "reason": "printff is wrong",
            "fix": "Use printf()"
        })

    return jsonify({
        "error": "No Error Found",
        "reason": "Code looks fine",
        "fix": "No fix needed"
    })

if __name__ == "__main__":
    app.run(debug=True)
