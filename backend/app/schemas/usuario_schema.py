from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field

class UsuarioSchema(BaseModel):

    nombre: str = Field(
        min_length=3
    )

    correo: EmailStr

    password: str = Field(
        min_length=6
    )

    id_rol: int