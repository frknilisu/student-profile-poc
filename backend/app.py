from flask import Flask
from extentions import mongo
from flask_cors import CORS
from routes.student_routes import student_bp
from routes.supervisor_routes import supervisor_bp
from routes.group_routes import group_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config["MONGO_URI"] = "mongodb://localhost:27017/student_db"
mongo.init_app(app)

app.register_blueprint(student_bp)
app.register_blueprint(supervisor_bp)
app.register_blueprint(group_bp)

if __name__ == "__main__":
    app.run(debug=True)
