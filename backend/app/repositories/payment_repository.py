from app.models.pago import Pago

def crear_pago(
    db,
    pago_data
):

    nuevo_pago = Pago(

        id_venta=pago_data.id_venta,

        metodo_pago=pago_data.metodo_pago,

        monto=pago_data.valor,

        estado_pago = "PAGADO"
    )

    db.add(nuevo_pago)

    db.commit()

    db.refresh(nuevo_pago)

    return nuevo_pago


def obtener_pagos(db):

    return db.query(Pago).all()