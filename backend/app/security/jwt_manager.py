from jose import jwt
from jose import JWTError

from datetime import datetime, timedelta

SECRET_KEY = "SUPER_SECRET_KEY"

ALGORITHM = "HS256"

def create_token(data: dict):

    token_data = data.copy()

    expire = datetime.utcnow() + timedelta(hours=8)

    token_data.update({
        "exp": expire
    })

    token = jwt.encode(
        token_data,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token

def validate_token(token: str):

    try:

        data = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return data

    except JWTError:

        return None