from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.config.database import Base

class Usuario(Base):

    __tablename__ = "usuarios"

    id_usuario = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nombre = Column(String)

    correo = Column(
        String,
        unique=True
    )

    password_hash = Column(String)

    estado = Column(String)

    id_rol = Column(
        Integer,
        ForeignKey("roles.id_rol")
    )

    rol = relationship("Role")