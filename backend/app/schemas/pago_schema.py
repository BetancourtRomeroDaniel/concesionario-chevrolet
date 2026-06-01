from pydantic import BaseModel

class PagoSchema(BaseModel):

    id_venta: int

    metodo_pago: str

    valor: float