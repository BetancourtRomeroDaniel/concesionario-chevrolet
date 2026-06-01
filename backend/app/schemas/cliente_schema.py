from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field

class ClienteSchema(BaseModel):

    cedula: str = Field(
        min_length=5
    )

    nombre: str = Field(
        min_length=3
    )

    telefono: str = Field(
        min_length=7
    )

    correo: EmailStr

    direccion: str = Field(
        min_length=5
    )