from flask import Blueprint, jsonify, request
from services.handler import insert_content
from pdfminer.high_level import extract_text
from io import BytesIO

upload = Blueprint("Upload", __name__)


@upload.route('/file', methods=['POST'])
def upload_file():
    uploaded_file = request.files.get('file')
    namespace = request.form.get('namespace')

    uploaded_file_stream = BytesIO(uploaded_file.read())

    text = extract_text(uploaded_file_stream)

    insert_content(text, namespace)

    return jsonify({"message": "OK"}), 200
