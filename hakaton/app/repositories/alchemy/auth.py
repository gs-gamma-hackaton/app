from app.db.models.user import User
from app.repositories.alchemy.base import BaseAlchemyRepository


class UserAlchemyRepository(BaseAlchemyRepository[User]):
    domain_model = User

    def get_current_user(self, email: str):
        return self.session.query(self.domain_model).filter(self.domain_model.email == email).first()
