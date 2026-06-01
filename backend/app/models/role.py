from sqlalchemy import Column, Integer, String
from app.config.database import Base

class Role(Base):

    __tablename__ = "roles"

    id_rol = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nombre_rol = Column(
        String,
        unique=True
    )