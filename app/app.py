from fastapi import FastAPI

# from app.api.exception_handlers import  use_case_validation_exception_handler
from app.api.router import api_router
from app.entrypoint import *  # noqa


# from app.services.usecases.exceptions import UseCaseValidationError


app = FastAPI(
    title='green-skills',
    version='0.1.0',
    # dependencies=[Depends(authorize)],
)

# Register routers
app.include_router(api_router)

# Register exception handlers
# app.add_exception_handler(UseCaseValidationError, use_case_validation_exception_handler)
