from app.models.vehiculo import Vehiculo

def get_all_vehicles(db):

    return db.query(Vehiculo).all()

def get_vehicle_by_id(
    db,
    id_vehiculo
):

    return db.query(Vehiculo).filter(
        Vehiculo.id_vehiculo == id_vehiculo
    ).first()

def create_vehicle(
    db,
    vehicle_data
):

    try:

        # VALIDAR PLACA

        existing_vehicle = db.query(
            Vehiculo
        ).filter(
            Vehiculo.placa == vehicle_data.placa
        ).first()

        if existing_vehicle:

            return {
                "error": "La placa ya existe"
            }

        new_vehicle = Vehiculo(

            placa = vehicle_data.placa,
            modelo = vehicle_data.modelo,
            marca = vehicle_data.marca,
            anio = vehicle_data.anio,
            color = vehicle_data.color,
            precio = vehicle_data.precio,
            stock = vehicle_data.stock,
            estado = "DISPONIBLE"
        )

        db.add(new_vehicle)

        db.commit()

        db.refresh(new_vehicle)

        return new_vehicle

    except Exception as e:

        db.rollback()

        return {
            "error": str(e)
        }

def update_vehicle(
    db,
    id_vehiculo,
    vehicle_data
):

    try:

        vehicle = get_vehicle_by_id(
            db,
            id_vehiculo
        )

        if not vehicle:

            return None

        vehicle.modelo = vehicle_data.modelo
        vehicle.marca = vehicle_data.marca
        vehicle.anio = vehicle_data.anio
        vehicle.color = vehicle_data.color
        vehicle.precio = vehicle_data.precio
        vehicle.stock = vehicle_data.stock

        db.commit()

        db.refresh(vehicle)

        return vehicle

    except Exception as e:

        db.rollback()

        return {
            "error": str(e)
        }

def delete_vehicle(
    db,
    id_vehiculo
):

    try:

        vehicle = get_vehicle_by_id(
            db,
            id_vehiculo
        )

        if not vehicle:

            return None

        db.delete(vehicle)

        db.commit()

        return vehicle

    except Exception as e:

        db.rollback()

        return {
            "error": str(e)
        }