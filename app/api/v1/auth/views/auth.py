from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_session
from app.api.v1.auth.serializer import UserCreate, UserLogin, UserResponse
from app.auth.jwt_auth import create_access_token
from app.config import settings
from app.db.models.user import User
from app.repositories.alchemy.auth import UserAlchemyRepository


router = APIRouter()


@router.post('/register', response_model=UserResponse)
async def register(
    user: UserCreate,
    session: Annotated[Session, Depends(get_session)],
):
    user_repository = UserAlchemyRepository(session)
    existing_user = user_repository.get_current_user(user.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Пользователь с таким email уже существует')

    hashed_password = User.hash_password(user.password)
    new_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password,
    )
    user = user_repository.create(new_user)
    return user


@router.post('/login', response_model=dict)
async def login(
    user_data: UserLogin,
    session: Annotated[Session, Depends(get_session)],
):
    user_repository = UserAlchemyRepository(session)
    user = user_repository.get_current_user(email=user_data.email)
    if not (user and user.verify_password(user_data.password, user.hashed_password)):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Неправильный email или пароль')

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={'sub': user.email}, expires_delta=access_token_expires)

    return {'access_token': access_token, 'token_type': 'bearer'}
