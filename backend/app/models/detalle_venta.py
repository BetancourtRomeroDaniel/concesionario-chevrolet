from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Numeric
from sqlalchemy import ForeignKey

from app.config.database import Base

class DetalleVenta(Base):

    __tablename__ = "detalle_venta"

    id_detalle = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_venta = Column(
        Integer,
        ForeignKey("ventas.id_venta")
    )

    id_vehiculo = Column(
        Integer,
        ForeignKey("vehiculos.id_vehiculo")
    )

    cantidad = Column(Integer)

    subtotal = Column(Numeric)