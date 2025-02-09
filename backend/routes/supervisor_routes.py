from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from extentions import mongo
from models.supervisor import Supervisor

supervisor_bp = Blueprint('supervisors', __name__, url_prefix='/api/supervisors')

@supervisor_bp.route('/', methods=['GET'])
def get_supervisors():
    supervisors = list(mongo.db.supervisors.find())
    return jsonify([Supervisor(**supervisor).to_dict() for supervisor in supervisors])

@supervisor_bp.route('/<id>', methods=['GET'])
def get_supervisor(id):
    supervisor = mongo.db.supervisors.find_one({"_id": ObjectId(id)})
    return jsonify(Supervisor(**supervisor).to_dict()) if supervisor else ('', 404)

@supervisor_bp.route('/', methods=['POST'])
def create_supervisor():
    data = request.json
    supervisor = Supervisor(**data)
    result = mongo.db.supervisors.insert_one(supervisor.to_dict())
    return jsonify({"id": str(result.inserted_id)}), 201

@supervisor_bp.route('/<id>', methods=['PUT'])
def update_supervisor(id):
    data = request.json
    mongo.db.supervisors.update_one({"_id": ObjectId(id)}, {"$set": data})
    return '', 204

@supervisor_bp.route('/<id>', methods=['DELETE'])
def delete_supervisor(id):
    mongo.db.supervisors.delete_one({"_id": ObjectId(id)})
    return '', 204
