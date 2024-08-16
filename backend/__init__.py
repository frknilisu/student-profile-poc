# app/__init__.py
from flask import Flask
from flask_cors import CORS
from backend.routes import app

def create_app():
    CORS(app)
    return app
