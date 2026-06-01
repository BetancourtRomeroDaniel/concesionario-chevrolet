from app.models.cliente import Cliente

def get_all_clients(db):

    return db.query(Cliente).all()

def get_client_by_id(db, id_cliente):

    return db.query(Cliente).filter(
        Cliente.id_cliente == id_cliente
    ).first()

def create_client(
    db,
    client_data
):

    try:

        # VALIDAR CEDULA

        existing_cedula = db.query(
            Cliente
        ).filter(
            Cliente.cedula == client_data.cedula
        ).first()

        if existing_cedula:

            return {
                "error": "La cédula ya existe"
            }

        # VALIDAR CORREO

        existing_email = db.query(
            Cliente
        ).filter(
            Cliente.correo == client_data.correo
        ).first()

        if existing_email:

            return {
                "error": "El correo ya existe"
            }

        new_client = Cliente(

            cedula = client_data.cedula,

            nombre = client_data.nombre,

            telefono = client_data.telefono,

            correo = client_data.correo,

            direccion = client_data.direccion,

            estado = "ACTIVO"
        )

        db.add(new_client)

        db.commit()

        db.refresh(new_client)

        return new_client

    except Exception as e:

        db.rollback()

        return {
            "error": "Error interno servidor"
        }

def update_client(
    db,
    id_cliente,
    client_data
):

    try:

        client = get_client_by_id(
            db,
            id_cliente
        )

        if not client:

            return None

        client.nombre = client_data.nombre
        client.telefono = client_data.telefono
        client.correo = client_data.correo
        client.direccion = client_data.direccion

        db.commit()

        db.refresh(client)

        return client

    except Exception as e:

        db.rollback()

        return {
            "error": "Error interno servidor"
        }

def delete_client(
    db,
    id_cliente
):

    try:

        client = get_client_by_id(
            db,
            id_cliente
        )

        if not client:

            return None

        db.delete(client)

        db.commit()

        return client

    except Exception as e:

        db.rollback()

        return {
            "error": "Error interno servidor"
        }