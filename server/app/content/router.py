from fastapi import APIRouter, Depends, File, Header, Request, UploadFile

from app.content.content_service import ContentService

router = APIRouter(prefix="/content")


def get_content_handler(request: Request, namespace: str = Header(...)):
    embeddings = request.app.state.embedding_model
    index = request.app.state.index

    return ContentService(namespace, embeddings, index)


@router.post("/file")
async def upload_file(
    file: UploadFile = File(...), handler: ContentService = Depends(get_content_handler)
):
    await handler.process_file(file)
    return {"message": "OK"}


@router.post("/text")
def upload_text(content: str, handler: ContentService = Depends(get_content_handler)):
    handler.process_text(content)
    return {"message": "OK"}
