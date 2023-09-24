from flask import Blueprint, Response, current_app, request
from .handlers.question_handler import QuestionHandler

chat = Blueprint("Chat", __name__)


@chat.route('/ask', methods=['POST'])
def post_question():
    data = request.json
    namespace = data.get('namespace')
    messages = data.get('messages')
    handler = QuestionHandler(
        chunk_extractor_service=current_app.chunk_extractor_service, namespace=namespace)
    response = handler.answer_question(messages)

    return Response(response, mimetype='text/event-stream')
