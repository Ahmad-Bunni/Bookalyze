from flask import Blueprint, jsonify, request, current_app
from .handlers.content_handler import ContentHandler


upload = Blueprint("Upload", __name__)


@upload.route('/file', methods=['POST'])
def upload_file():
    try:
        file = request.files.get('file')
        namespace = request.form.get('namespace')

        handler = ContentHandler(
            chunk_extractor_service=current_app.chunk_extractor_service)
        handler.process_file(file, namespace)

        return jsonify({"message": "OK"}), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 400


@upload.route('/text', methods=['POST'])
def upload_text():
    data = request.json
    content = data.get('content')
    namespace = data.get('namespace')

    handler = ContentHandler(
        chunk_extractor_service=current_app.chunk_extractor_service)
    handler.process_text(content, namespace)

    return jsonify({"message": "OK"}), 200
