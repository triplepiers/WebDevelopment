from flask import Flask
from flask_cors import CORS
from src.user import user
from src.book import book
from src.file import file
from src.text import text

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = '123456'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.register_blueprint(user, url_prefix='/user')
app.register_blueprint(book, url_prefix='/book')
app.register_blueprint(file, url_prefix='/file')
app.register_blueprint(text, url_prefix="/text")


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
