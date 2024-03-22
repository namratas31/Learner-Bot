from flask import Flask, render_template, request, jsonify
import requests
import random

app = Flask(__name__)

LANGUAGE_TOOL_URL = 'https://languagetool.org/api/v2/check'

# Sample questions for the AI to ask
questions = [
    "What did you do yesterday?",
    "Tell me about your favorite book.",
    "What are your plans for the weekend?"
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_question')
def generate_question():
    question = random.choice(questions)
    return jsonify({'question': question})

@app.route('/check_grammar', methods=['POST'])
def check_grammar():
    data = request.get_json()
    userInput = data.get('userInput', '')

    response = requests.post(LANGUAGE_TOOL_URL, data={'text': userInput, 'language': 'en-US'})
    json_response = response.json()

    relevance = 'Yes' if len(userInput.split()) > 2 else 'No'
    grammar = 'Correct' if not json_response['matches'] else 'Incorrect'

    return jsonify({'relevance': relevance, 'grammar': grammar})

if __name__ == '__main__':
    app.run(debug=True)
