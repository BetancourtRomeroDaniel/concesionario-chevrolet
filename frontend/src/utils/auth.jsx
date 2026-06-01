import { jwtDecode } from "jwt-decode"

export const getUserData = () => {

  const token = localStorage.getItem(
    "token"
  )

  if (!token) return null

  return jwtDecode(token)
}