from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.schemas.cliente_schema import (
    ClienteSchema
)

from app.config.session import get_db

from app.repositories.cliente_repository import (
    get_all_clients,
    get_client_by_id,
    create_client,
    update_client,
    delete_client
)

from app.middleware.role_middleware import (
    role_required
)

router = APIRouter(
    prefix="/clientes",
    tags=["Clientes"]
)

# LISTAR CLIENTES
@router.get("/")
def listar_clientes(
    db: Session = Depends(get_db),
    user = Depends(role_required([1,2,3,4]))
):

    return get_all_clients(db)

# OBTENER CLIENTE
@router.get("/{id_cliente}")
def obtener_cliente(
    id_cliente: int,
    db: Session = Depends(get_db),
    user = Depends(role_required([1,2,3,4]))
):

    client = get_client_by_id(
        db,
        id_cliente
    )

    if not client:

        raise HTTPException(
            status_code=404,
            detail="Cliente no encontrado"
        )

    return client

# CREAR CLIENTE
@router.post("/")
def crear_cliente(
    client: ClienteSchema,
    db: Session = Depends(get_db),
    user = Depends(role_required([1,2]))
):

    return create_client(
        db,
        client
    )

# ACTUALIZAR CLIENTE
@router.put("/{id_cliente}")
def actualizar_cliente(
    id_cliente: int,
    client: ClienteSchema,
    db: Session = Depends(get_db),
    user = Depends(role_required([1,2]))
):

    updated = update_client(
        db,
        id_cliente,
        client
    )

    if not updated:

        raise HTTPException(
            status_code=404,
            detail="Cliente no encontrado"
        )

    return updated

# ELIMINAR CLIENTE
@router.delete("/{id_cliente}")
def eliminar_cliente(
    id_cliente: int,
    db: Session = Depends(get_db),
    user = Depends(role_required([1]))
):

    deleted = delete_client(
        db,
        id_cliente
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Cliente no encontrado"
        )

    return {
        "mensaje": "Cliente eliminado"
    }