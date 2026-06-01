from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from app.models.vehiculo import Vehiculo

from sqlalchemy.orm import Session

from app.schemas.vehiculo_schema import (
    VehiculoSchema
)

from app.config.session import get_db

from app.repositories.vehicle_repository import (
    get_all_vehicles,
    get_vehicle_by_id,
    create_vehicle,
    update_vehicle,
    delete_vehicle
)

from app.middleware.role_middleware import (
    role_required
)

router = APIRouter(
    prefix="/vehiculos",
    tags=["Vehiculos"]
)

# LISTAR VEHICULOS
@router.get("/")
def listar_vehiculos(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    user = Depends(role_required([1,2,3,4]))
):

    return db.query(
        Vehiculo
    ).offset(skip).limit(limit).all()

# OBTENER VEHICULO
@router.get("/{id_vehiculo}")
def obtener_vehiculo(
    id_vehiculo: int,
    db: Session = Depends(get_db),
    user = Depends(role_required([1,2,3,4]))
):

    vehicle = get_vehicle_by_id(
        db,
        id_vehiculo
    )

    if not vehicle:

        raise HTTPException(
            status_code=404,
            detail="Vehiculo no encontrado"
        )

    return vehicle

# CREAR VEHICULO
@router.post("/")
def crear_vehiculo(
    vehicle: VehiculoSchema,
    db: Session = Depends(get_db),
    user = Depends(role_required([1,2]))
):

    return create_vehicle(
        db,
        vehicle
    )

# ACTUALIZAR VEHICULO
@router.put("/{id_vehiculo}")
def actualizar_vehiculo(
    id_vehiculo: int,
    vehicle: VehiculoSchema,
    db: Session = Depends(get_db),
    user = Depends(role_required([1,2]))
):

    updated = update_vehicle(
        db,
        id_vehiculo,
        vehicle
    )

    if not updated:

        raise HTTPException(
            status_code=404,
            detail="Vehiculo no encontrado"
        )

    return updated

# BUSCAR VEHICULO
@router.get("/buscar/{modelo}")

def buscar_vehiculo(
    modelo: str,
    db: Session = Depends(get_db),
    user = Depends(role_required([1,2,3,4]))
):

    return db.query(Vehiculo).filter(
        Vehiculo.modelo.ilike(f"%{modelo}%")
    ).all()

# ELIMINAR VEHICULO
@router.delete("/{id_vehiculo}")
def eliminar_vehiculo(
    id_vehiculo: int,
    db: Session = Depends(get_db),
    user = Depends(role_required([1]))
):

    deleted = delete_vehicle(
        db,
        id_vehiculo
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Vehiculo no encontrado"
        )

    return {
        "mensaje": "Vehiculo eliminado"
    }