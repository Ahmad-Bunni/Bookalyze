from flask import Blueprint, jsonify, request
from services.handler import insert_content, get_context
from services.openai import handle_message

chat = Blueprint("Chat", __name__)


@chat.route('/ask', methods=['POST'])
def post_message():
    data = request.json
    message = data.get('message')
    namespace = data.get('namespace')

    # context = get_context(message, namespace)

    response = handle_message(message, "")

    return jsonify({"message": response}), 200


@chat.route('/embedding', methods=['POST'])
def post_content():
    data = request.json
    content = data.get('content')
    namespace = data.get('namespace')

    insert_content(content, namespace)

    return jsonify({"message": "OK"}), 200
