from flask import Flask, request, jsonify

app = Flask(__name__)

# Endpoint to check pronunciation
@app.route('/check_pronunciation', methods=['POST'])
def check_pronunciation():
    expected_word = request.json.get('expected_word')
    recorded_word = request.json.get('recorded_word').lower().strip()

    # Replace this logic with your pronunciation check algorithm
    if recorded_word == expected_word:
        return jsonify({'result': 'Correct pronunciation!'})
    else:
        return jsonify({'result': 'Incorrect pronunciation. Try again!'})

if __name__ == '__main__':
    app.run(debug=True)
