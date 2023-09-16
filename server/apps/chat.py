from flask import Blueprint, current_app, jsonify, request
from .handlers.question_handler import QuestionHandler

chat = Blueprint("Chat", __name__)


@chat.route('/ask', methods=['POST'])
def post_question():
    data = request.json
    question = data.get('question')
    namespace = data.get('namespace')

    handler = QuestionHandler(
        chunk_extractor_service=current_app.chunk_extractor_service, llm=current_app.llm_gpt)
    response = handler.answer_question(question, namespace)

    return jsonify({"message": response}), 200
