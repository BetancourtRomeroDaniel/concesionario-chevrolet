from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.config.session import get_db

from app.repositories.report_repository import (
    obtener_reportes
)

from app.middleware.role_middleware import (
    role_required
)

router = APIRouter(

    prefix="/reportes",

    tags=["Reportes"]
)

@router.get("/")
def reportes(

    db: Session = Depends(get_db),

    user = Depends(role_required([1,2]))
):

    return obtener_reportes(db)