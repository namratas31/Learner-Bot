from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return open('index.html', 'r').read()

if __name__ == '__main__':
    app.run(debug=True)
