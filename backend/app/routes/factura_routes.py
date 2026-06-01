from fastapi import APIRouter
from fastapi.responses import FileResponse

from fastapi import Depends

from sqlalchemy.orm import Session

from app.config.session import get_db

from app.models.venta import Venta
from app.models.cliente import Cliente
from app.models.vehiculo import Vehiculo

from app.utils.factura_pdf import (
    generar_factura_pdf
)

from app.middleware.role_middleware import (
    role_required
)

from app.models.detalle_venta import (
    DetalleVenta
)

router = APIRouter(
    prefix="/facturas",
    tags=["Facturas"]
)

@router.get("/{id_venta}")

def descargar_factura(

    id_venta: int,

    db: Session = Depends(get_db),

    user = Depends(role_required([1,2]))
):

    venta = db.query(
        Venta
    ).filter(
        Venta.id_venta == id_venta
    ).first()

    if not venta:

        return {
            "error": "Venta no encontrada"
        }

    cliente = db.query(
        Cliente
    ).filter(
        Cliente.id_cliente ==
        venta.id_cliente
    ).first()

    detalle = db.query(
        DetalleVenta
    ).filter(
        DetalleVenta.id_venta ==
        venta.id_venta
    ).first()

    if not detalle:

        return {
            "error": "Detalle venta no encontrado"
        }

    vehiculo = db.query(
        Vehiculo
    ).filter(
        Vehiculo.id_vehiculo ==
        detalle.id_vehiculo
    ).first()

    pdf_path = generar_factura_pdf(
        venta,
        cliente,
        vehiculo
    )

    return FileResponse(

        path=pdf_path,

        filename=f"factura_{venta.id_venta}.pdf",

        media_type="application/pdf"
    )