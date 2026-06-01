from pydantic import BaseModel
from pydantic import Field

from typing import Optional

class VehiculoSchema(BaseModel):

    placa: str = Field(
        min_length=3,
        max_length=10
    )

    modelo: str = Field(
        min_length=2
    )

    marca: str = Field(
        min_length=2
    )

    anio: int = Field(
        gt=2000,
        lt=2035
    )

    color: Optional[str] = None

    precio: float = Field(
        gt=0
    )

    stock: int = Field(
        ge=0
    )