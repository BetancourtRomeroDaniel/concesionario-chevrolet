from app.models.venta import Venta
from app.models.detalle_venta import DetalleVenta
from app.models.vehiculo import Vehiculo
from sqlalchemy import text
from sqlalchemy import func



def total_ventas(db):

    return db.query(
        func.count(Venta.id_venta)
    ).scalar()

def total_ingresos(db):

    return db.query(
        func.sum(Venta.total)
    ).scalar() or 0


def vehiculos_vendidos(db):

    return db.query(
        func.sum(
            DetalleVenta.cantidad
        )
    ).scalar() or 0

def registrar_venta(
    db,
    venta_data,
    id_usuario
):

    try:

        vehiculo = db.query(Vehiculo).filter(
            Vehiculo.id_vehiculo == venta_data.id_vehiculo
        ).first()

        if not vehiculo:

            return {
                "error": "Vehiculo no encontrado"
            }

        if vehiculo.stock <= 0:

            return {
                "error": "Vehiculo agotado"
            }

        if vehiculo.stock < venta_data.cantidad:

            return {
                "error": "Stock insuficiente"
            }

        subtotal = (
            vehiculo.precio *
            venta_data.cantidad
        )

        nueva_venta = Venta(
            id_cliente = venta_data.id_cliente,
            id_usuario = id_usuario,
            total = subtotal,
            estado = "COMPLETADA"
        )

        db.add(nueva_venta)

        db.flush()

        if not nueva_venta.id_venta:

            raise Exception(
                "No se pudo generar venta"
            )

        detalle = DetalleVenta(
            id_venta = nueva_venta.id_venta,
            id_vehiculo = venta_data.id_vehiculo,
            cantidad = venta_data.cantidad,
            subtotal = subtotal
        )

        db.add(detalle)

        vehiculo.stock -= venta_data.cantidad

        db.commit()

        db.refresh(nueva_venta)

        return {
            "mensaje": "Venta registrada",
            "venta_id": nueva_venta.id_venta
        }

    except Exception as e:

        db.rollback()

        return {
            "error": str(e)
        }
    

def obtener_ventas(db):

    query = text("""

        SELECT

            v.id_venta,

            c.nombre AS cliente,

            ve.modelo AS vehiculo,
                 
            dv.cantidad,
                 
            u.nombre AS vendedor,

            v.total,

            v.fecha_venta

        FROM ventas v

        INNER JOIN clientes c
            ON v.id_cliente = c.id_cliente

        INNER JOIN detalle_venta dv
            ON v.id_venta = dv.id_venta

        INNER JOIN vehiculos ve
            ON dv.id_vehiculo = ve.id_vehiculo
                 
        INNER JOIN usuarios u
            ON v.id_usuario = u.id_usuario

        ORDER BY v.id_venta DESC

    """)

    result = db.execute(query)

    return [

        dict(row._mapping)

        for row in result

    ]