from fastapi import HTTPException
from fastapi import Depends

from app.middleware.auth_middleware import (
    auth_required
)

def role_required(allowed_roles):

    def verify_role(

        payload = Depends(auth_required)
    ):

        user_role = int(
            payload["id_rol"]
        )

        if user_role not in allowed_roles:

            raise HTTPException(

                status_code=403,

                detail="No autorizado"
            )

        return payload

    return verify_role