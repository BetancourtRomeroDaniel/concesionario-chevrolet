from fastapi import APIRouter
from fastapi import Depends

from app.middleware.role_middleware import (
    role_required
)

router = APIRouter(
    prefix="/admin"
)

# SOLO SUPERADMIN
@router.get("/superadmin")
def superadmin_panel(
    user = Depends(
        role_required([1])
    )
):

    return {
        "mensaje": "Bienvenido SUPERADMIN",
        "usuario": user
    }

# SUPERADMIN Y ADMINISTRADOR
@router.get("/dashboard")
def dashboard(
    user = Depends(
        role_required([1, 2])
    )
):

    return {
        "mensaje": "Dashboard administrativo",
        "usuario": user
    }

# TODOS LOS ROLES
@router.get("/consulta")
def consulta(
    user = Depends(
        role_required([1, 2, 3, 4])
    )
):

    return {
        "mensaje": "Consulta permitida",
        "usuario": user
    }