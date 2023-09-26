from fastapi import APIRouter, Depends, UploadFile, Form, HTTPException, Request
from .handlers.content_handler import ContentHandler

router = APIRouter()


def get_content_handler(request: Request, namespace: str):
    chunk_extractor_service = request.app.state.chunk_extractor_service
    encoder = request.app.state.encoder
    embeddings = request.app.state.embedding_model
    index = request.app.state.index

    return ContentHandler(chunk_extractor_service, namespace, encoder, embeddings, index)


@router.post("/file")
def upload_file(file: UploadFile = Form(...), namespace: str = Form(...), handler: ContentHandler = Depends(get_content_handler)):
    handler.process_file(file.file)
    return {"message": "OK"}


@router.post("/text")
def upload_text(content: str, namespace: str, handler: ContentHandler = Depends(get_content_handler)):
    handler.process_text(content)
    return {"message": "OK"}
