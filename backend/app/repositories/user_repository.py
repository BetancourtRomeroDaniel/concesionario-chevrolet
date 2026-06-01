from app.models.usuario import Usuario

from app.security.password_hash import (
    hash_password
)

# BUSCAR USUARIO POR EMAIL

def get_user_by_email(
    db,
    correo
):

    return db.query(
        Usuario
    ).filter(
        Usuario.correo == correo
    ).first()


# LISTAR USUARIOS

def get_users(db):

    return db.query(
        Usuario
    ).all()


# CREAR USUARIO

def create_user(
    db,
    user_data
):

    existing_user = db.query(
        Usuario
    ).filter(
        Usuario.correo == user_data.correo
    ).first()

    if existing_user:

        return {
            "error": "Correo ya registrado"
        }

    new_user = Usuario(

        nombre = user_data.nombre,

        correo = user_data.correo,

        password_hash = hash_password(
            user_data.password
        ),

        estado = "ACTIVO",

        id_rol = user_data.id_rol
    )

    db.add(new_user)

    try:

        db.commit()

        db.refresh(new_user)

        return new_user

    except Exception as e:

        db.rollback()

        return {
            "error": str(e)
        }

# ELIMINAR USUARIO

def delete_user(
    db,
    id_usuario
):

    user = db.query(
        Usuario
    ).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not user:

        return None

    db.delete(user)

    try:

        db.commit()

        return user

    except Exception as e:

        db.rollback()

        return {
            "error": "Error interno servidor"
        }