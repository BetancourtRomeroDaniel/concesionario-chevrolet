from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.schemas.venta_schema import (
    VentaSchema
)

from app.config.session import get_db

from app.repositories.sale_repository import (
    registrar_venta,
    obtener_ventas
)

from app.middleware.role_middleware import (
    role_required
)

router = APIRouter(
    prefix="/ventas",
    tags=["Ventas"]
)

@router.get("/")
def listar_ventas(

    db: Session = Depends(get_db),

    user = Depends(role_required([1,2]))

):

    return obtener_ventas(db)

@router.post("/")
def crear_venta(
    venta: VentaSchema,
    db: Session = Depends(get_db),
    user = Depends(role_required([1,2]))
):

    return registrar_venta(
        db,
        venta,
        user["id_usuario"]
    )