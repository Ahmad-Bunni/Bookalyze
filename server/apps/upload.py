from fastapi import APIRouter, Depends, UploadFile, File, Request
from .handlers.content_handler import ContentHandler

router = APIRouter()


def get_content_handler(request: Request):
    chunk_extractor_service = request.app.state.chunk_extractor_service
    encoder = request.app.state.encoder
    embeddings = request.app.state.embedding_model
    index = request.app.state.index

    return ContentHandler(chunk_extractor_service, 'default', encoder, embeddings, index)


@router.post("/file")
async def upload_file(file: UploadFile = File(...), handler: ContentHandler = Depends(get_content_handler)):
    await handler.process_file(file)
    return {"message": "OK"}


@router.post("/text")
def upload_text(content: str, handler: ContentHandler = Depends(get_content_handler)):
    handler.process_text(content)
    return {"message": "OK"}
