from flask import Blueprint, jsonify, request
from handlers.question_handler import get_context
from services.openai import handle_message

chat = Blueprint("Chat", __name__)


@chat.route('/ask', methods=['POST'])
def post_message():
    data = request.json
    message = data.get('message')
    namespace = data.get('namespace')

    context = get_context(message, namespace)

    response = handle_message(message, context)

    return jsonify({"message": response}), 200
