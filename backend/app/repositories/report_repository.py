from app.repositories.sale_repository import (
    total_ventas,
    total_ingresos,
    vehiculos_vendidos
)

def obtener_reportes(db):

    return {

        "total_ventas":
        total_ventas(db),

        "ingresos":
        total_ingresos(db),

        "vehiculos_vendidos":
        vehiculos_vendidos(db)
    }