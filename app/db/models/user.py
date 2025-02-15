from passlib.context import CryptContext
from sqlalchemy import BigInteger, Boolean, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.models.base import BaseModel
from app.db.models.presentation import Presentation


pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


class User(BaseModel):
    __tablename__ = 'users'

    id = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )
    username = mapped_column(
        String(50),
        unique=True,
        index=True,
    )
    email = mapped_column(
        String(100),
        unique=True,
        index=True,
    )

    hashed_password = mapped_column(
        String,
    )

    is_active = mapped_column(
        Boolean,
        default=True,
    )

    presentations: Mapped[list['Presentation']] = relationship(back_populates='user')

    @staticmethod
    def hash_password(password: str):
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str):
        return pwd_context.verify(plain_password, hashed_password)
