from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials

from app.security.jwt_manager import validate_token

security = HTTPBearer()

def auth_required(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    data = validate_token(token)

    if not data:

        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )

    return data