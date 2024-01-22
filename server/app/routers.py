from fastapi import APIRouter

from app.chat.router import router as chat_router
from app.content.router import router as content_router

routers = APIRouter()
router_list = [chat_router, content_router]

for router in router_list:
    routers.include_router(router)
