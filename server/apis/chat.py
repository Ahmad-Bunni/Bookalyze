from flask import Blueprint, jsonify, request
from services.handler import handle_content, handle_question
from services.openai import ask_question

chat = Blueprint("Chat", __name__)


@chat.route('/ask', methods=['POST'])
def post_message():
    data = request.json
    question = data.get('question')
    namespace = data.get('namespace')

    context = handle_question(question, namespace)

    reply = ask_question(question, context)

    return jsonify({"message": reply}), 200


@chat.route('/embedding', methods=['POST'])
def post_content():
    data = request.json
    content = data.get('content')
    namespace = data.get('namespace')

    handle_content(content, namespace)

    return jsonify({"message": "OK"}), 200
