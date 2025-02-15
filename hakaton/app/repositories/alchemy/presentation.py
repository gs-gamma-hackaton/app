from app.db.models.presentation import Presentation
from app.repositories.alchemy.base import BaseAlchemyRepository


class PresentationAlchemyRepository(BaseAlchemyRepository[Presentation]):
    domain_model = Presentation

    def filter_by_user(self, user_id):
        return self.session.query(self.domain_model).filter(user_id=user_id).all()
