from fastapi import APIRouter, Depends, UploadFile, File, Request, Header
from app.content.content_service import ContentService

router = APIRouter()


def get_content_handler(request: Request, namespace: str = Header(...)):
    encoder = request.app.state.encoder
    embeddings = request.app.state.embedding_model
    index = request.app.state.index

    return ContentService(namespace, encoder, embeddings, index)


@router.post("/content/file")
async def upload_file(file: UploadFile = File(...), handler: ContentService = Depends(get_content_handler)):
    await handler.process_file(file)
    return {"message": "OK"}


@router.post("content/text")
def upload_text(content: str, handler: ContentService = Depends(get_content_handler)):
    handler.process_text(content)
    return {"message": "OK"}
