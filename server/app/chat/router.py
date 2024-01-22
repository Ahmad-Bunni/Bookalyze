from pydantic import BaseModel
from fastapi import APIRouter, Depends, Request, Header
from fastapi.responses import StreamingResponse
from app.chat.chat_service import ChatService

router = APIRouter(prefix="/chat")


class ChatModel(BaseModel):
    messages: list


def get_question_handler(request: Request, namespace: str = Header(...)):
    encoder = request.app.state.encoder
    embeddings = request.app.state.embedding_model
    index = request.app.state.index

    return ChatService(namespace, encoder, embeddings, index)


@router.post("")
async def ask(chatModel: ChatModel, handler: ChatService = Depends(get_question_handler)):

    return StreamingResponse(handler.answer_question(chatModel.messages), media_type='text/event-stream')
