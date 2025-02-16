from fastapi import FastAPI

from app.api.router import api_router
from app.entrypoint import *  # noqa


app = FastAPI(
    title='green-skills',
    version='0.1.0',
    # dependencies=[Depends(authorize)],
)

# Register routers
app.include_router(api_router)

# Register exception handlers
# app.add_exception_handler(UseCaseValidationError, use_case_validation_exception_handler)
