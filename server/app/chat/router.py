from fastapi import APIRouter, Depends, Header, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.chat.chat_service import ChatService

router = APIRouter(prefix="/chat")


class ChatModel(BaseModel):
    messages: list


def get_question_handler(request: Request, namespace: str = Header(...)):
    # return ChatService(
    #     namespace, request.app.state.embedding_model, request.app.state.index
    # )
    return ChatService()


@router.post("")
async def ask(
    chatModel: ChatModel, handler: ChatService = Depends(get_question_handler)
):
    return StreamingResponse(
        handler.answer_question(chatModel.messages), media_type="text/event-stream"
    )
