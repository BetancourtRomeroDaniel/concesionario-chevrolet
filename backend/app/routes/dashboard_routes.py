from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from sqlalchemy import func

from app.config.session import get_db

from app.models.cliente import Cliente
from app.models.vehiculo import Vehiculo
from app.models.venta import Venta

from app.middleware.role_middleware import (
    role_required
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def obtener_estadisticas(
    db: Session = Depends(get_db),
    user = Depends(role_required([1,2,3,4]))
):

    total_clientes = db.query(
        Cliente
    ).count()

    total_vehiculos = db.query(
        Vehiculo
    ).count()

    total_ventas = db.query(
        Venta
    ).count()

    stock_total = db.query(
        func.sum(Vehiculo.stock)
    ).scalar()

    return {

        "clientes": total_clientes,
        "vehiculos": total_vehiculos,
        "ventas": total_ventas,
        "stock": stock_total or 0
    }