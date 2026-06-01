from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.config.session import get_db

from app.schemas.usuario_schema import (
    UsuarioSchema
)

from app.repositories.user_repository import (
    get_users,
    create_user,
    delete_user
)

from app.middleware.role_middleware import (
    role_required
)

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

# REGISTER PUBLICO

@router.post("/register")
def register_public_user(

    usuario: UsuarioSchema,

    db: Session = Depends(get_db)
):

    # FORZAR ROL USUARIO
    usuario.id_rol = 3

    result = create_user(
        db,
        usuario
    )

    if isinstance(result, dict):

        raise HTTPException(
            status_code=400,
            detail=result["error"]
        )

    return result

# LISTAR

@router.get("/")
def listar_usuarios(

    db: Session = Depends(get_db),

    user = Depends(role_required([1]))
):

    return get_users(db)

# CREAR

@router.post("/")
def crear_usuario(

    usuario: UsuarioSchema,

    db: Session = Depends(get_db),

    user = Depends(role_required([1]))
):

    result = create_user(
        db,
        usuario
    )

    if isinstance(result, dict):

        raise HTTPException(
            status_code=400,
            detail=result["error"]
        )

    return result

# ELIMINAR

@router.delete("/{id_usuario}")
def eliminar_usuario(

    id_usuario: int,

    db: Session = Depends(get_db),

    user = Depends(role_required([1]))
):

    deleted = delete_user(
        db,
        id_usuario
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    return {
        "mensaje": "Usuario eliminado"
    }