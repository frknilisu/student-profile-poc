# app/__init__.py
from flask import Flask
from app.routes import app

def create_app():
    return app
