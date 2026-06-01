from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.config.session import get_db

from app.schemas.pago_schema import (
    PagoSchema
)

from app.repositories.payment_repository import (
    crear_pago,
    obtener_pagos
)

from app.middleware.role_middleware import (
    role_required
)

router = APIRouter(
    prefix="/pagos",
    tags=["Pagos"]
)

@router.post("/")
def registrar_pago(

    pago: PagoSchema,

    db: Session = Depends(get_db),

    user = Depends(role_required([1,2]))
):

    return crear_pago(
        db,
        pago
    )

@router.get("/")
def listar_pagos(

    db: Session = Depends(get_db),

    user = Depends(role_required([1,2]))
):

    return obtener_pagos(db)