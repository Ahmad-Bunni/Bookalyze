from flask import Blueprint, jsonify, request
from handlers.content_handler import process_file, process_text

upload = Blueprint("Upload", __name__)


@upload.route('/file', methods=['POST'])
def upload_file():
    file = request.files.get('file')
    namespace = request.form.get('namespace')

    process_file(file, namespace)

    return jsonify({"message": "OK"}), 200


@upload.route('/text', methods=['POST'])
def upload_text():
    data = request.json
    content = data.get('content')
    namespace = data.get('namespace')

    process_text(content, namespace)

    return jsonify({"message": "OK"}), 200
