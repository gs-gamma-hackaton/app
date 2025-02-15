from app.db.models.presentation import Presentation
from app.repositories.alchemy.base import BaseAlchemyRepository


class PresentationAlchemyRepository(BaseAlchemyRepository[Presentation]):
    domain_model = Presentation
