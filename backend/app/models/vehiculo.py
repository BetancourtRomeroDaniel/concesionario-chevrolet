from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Numeric

from app.config.database import Base

class Vehiculo(Base):

    __tablename__ = "vehiculos"

    id_vehiculo = Column(
        Integer,
        primary_key=True,
        index=True
    )

    placa = Column(
        String,
        unique=True
    )

    modelo = Column(String)

    marca = Column(String)

    anio = Column(Integer)

    color = Column(String)

    precio = Column(Numeric)

    stock = Column(Integer)

    estado = Column(String)