from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Numeric
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import TIMESTAMP

from sqlalchemy.sql import func

from app.config.database import Base

class Venta(Base):

    __tablename__ = "ventas"

    id_venta = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_cliente = Column(
        Integer,
        ForeignKey("clientes.id_cliente")
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario")
    )

    fecha_venta = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    total = Column(Numeric)

    estado = Column(String)