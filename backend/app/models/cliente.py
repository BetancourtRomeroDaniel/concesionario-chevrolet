from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.config.database import Base

class Cliente(Base):

    __tablename__ = "clientes"

    id_cliente = Column(
        Integer,
        primary_key=True,
        index=True
    )

    cedula = Column(
        String,
        unique=True
    )

    nombre = Column(String)

    telefono = Column(String)

    correo = Column(
        String,
        unique=True
    )

    direccion = Column(String)

    estado = Column(String)