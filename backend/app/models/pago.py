from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Numeric
from sqlalchemy import ForeignKey
from sqlalchemy import TIMESTAMP

from sqlalchemy.sql import func

from app.config.database import Base

class Pago(Base):

    __tablename__ = "pagos"

    id_pago = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_venta = Column(
        Integer,
        ForeignKey("ventas.id_venta")
    )

    metodo_pago = Column(String)

    monto = Column(Numeric)

    estado_pago = Column(String)

    fecha_pago = Column(
        TIMESTAMP,
        server_default=func.now()
    )