from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.schemas.login_schema import LoginSchema

from app.security.jwt_manager import create_token
from app.security.password_hash import verify_password

from app.config.session import get_db

from app.repositories.user_repository import (
    get_user_by_email
)

router = APIRouter()

@router.post("/login")
def login(
    user: LoginSchema,
    db: Session = Depends(get_db)
):

    db_user = get_user_by_email(
        db,
        user.correo
    )

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Usuario no encontrado"
        )

    password_correct = verify_password(
        user.password,
        db_user.password_hash
    )

    if not password_correct:

        raise HTTPException(
            status_code=401,
            detail="Contraseña incorrecta"
        )

    token = create_token({
        "id_usuario": db_user.id_usuario,
        "correo": db_user.correo,
        "id_rol": db_user.id_rol
    })

    return {
        "access_token": token,
        "usuario": db_user.nombre
    }