from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from extentions import mongo
from models.group import Group

group_bp = Blueprint('groups', __name__, url_prefix='/api/groups')

@group_bp.route('/', methods=['GET'])
def get_groups():
    groups = list(mongo.db.groups.find())
    return jsonify([Group(**group).to_dict() for group in groups])

@group_bp.route('/<id>', methods=['GET'])
def get_group(id):
    group = mongo.db.groups.find_one({"_id": ObjectId(id)})
    return jsonify(Group(**group).to_dict()) if group else ('', 404)

@group_bp.route('/', methods=['POST'])
def create_group():
    data = request.json
    group = Group(**data)
    result = mongo.db.groups.insert_one(group.to_dict())
    return jsonify({"id": str(result.inserted_id)}), 201

@group_bp.route('/<id>', methods=['PUT'])
def update_group(id):
    data = request.json
    mongo.db.groups.update_one({"_id": ObjectId(id)}, {"$set": data})
    return '', 204

@group_bp.route('/<id>', methods=['DELETE'])
def delete_group(id):
    mongo.db.groups.delete_one({"_id": ObjectId(id)})
    return '', 204
