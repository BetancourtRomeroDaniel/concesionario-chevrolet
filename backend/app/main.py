from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.config.database import engine, Base

# IMPORTAR MODELOS
from app.models.usuario import Usuario
from app.models.role import Role
from app.models.cliente import Cliente
from app.models.vehiculo import Vehiculo
from app.models.venta import Venta
from app.models.detalle_venta import DetalleVenta

# IMPORTAR RUTAS
from app.routes.auth_routes import (
    router as auth_router
)

from app.routes.user_routes import (
    router as user_router
)

from app.routes.admin_routes import (
    router as admin_router
)

from app.routes.client_routes import (
    router as client_router
)

from app.routes.vehicle_routes import (
    router as vehicle_router
)

from app.routes.sale_routes import (
    router as sale_router
)

from app.routes.dashboard_routes import (
    router as dashboard_router
)

from app.middleware.error_middleware import (
    global_exception_handler
)

from app.routes.factura_routes import (
    router as factura_router
)

from app.routes.pago_routes import (
    router as pago_router
)

from app.routes.report_routes import (
    router as report_router
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(
    Exception,
    global_exception_handler
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(admin_router)
app.include_router(client_router)
app.include_router(vehicle_router)
app.include_router(sale_router)
app.include_router(dashboard_router)
app.include_router(factura_router)
app.include_router(pago_router)
app.include_router(report_router)

@app.get("/")
def home():

    return {
        "message": "Sistema Chevrolet funcionando"
    }

