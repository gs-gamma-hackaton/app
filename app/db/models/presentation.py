from sqlalchemy import BigInteger, ForeignKey, JSON, Text
from sqlalchemy.orm import mapped_column, relationship

from app.db.models.base import BaseModel


class Presentation(BaseModel):
    __tablename__ = 'presentation'

    id = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )

    prompts = mapped_column(
        Text,
        nullable=True,
    )

    data = mapped_column(
        JSON,
        nullable=True,
    )

    user_id = mapped_column(BigInteger, ForeignKey('users.id'), primary_key=True)
    user = relationship('User', back_populates='presentations')
