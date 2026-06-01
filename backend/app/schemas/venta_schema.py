from pydantic import BaseModel

class VentaSchema(BaseModel):

    id_cliente: int
    id_vehiculo: int
    cantidad: int