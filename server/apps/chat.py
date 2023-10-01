from pydantic import BaseModel
from fastapi import APIRouter, Depends, Request
from fastapi.responses import StreamingResponse
from .handlers.question_handler import QuestionHandler

router = APIRouter()


class AskModel(BaseModel):
    messages: list
    namespace: str | None = "default"


def get_question_handler(request: Request, askModel: AskModel):
    chunk_extractor_service = request.app.state.chunk_extractor_service
    encoder = request.app.state.encoder
    embeddings = request.app.state.embedding_model
    index = request.app.state.index
    print(askModel.namespace)

    return QuestionHandler(chunk_extractor_service, askModel.namespace, encoder, embeddings, index)


@router.post("/ask")
def post_question(askModel: AskModel, handler: QuestionHandler = Depends(get_question_handler)):

    return StreamingResponse(handler.answer_question(askModel.messages), media_type='text/event-stream')
