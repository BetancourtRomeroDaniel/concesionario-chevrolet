import { useState } from "react"

import { useNavigate } from "react-router-dom"

import Swal from "sweetalert2"

import api from "../services/api"

import logo from "../assets/chevrolet.png"

function LoginPage() {

  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)

  const [loginData, setLoginData] = useState({

    correo: "",
    password: ""
  })

  const [registerData, setRegisterData] = useState({

    nombre: "",
    correo: "",
    password: "",
    id_rol: 3
  })

  // LOGIN

  const iniciarSesion = async (e) => {

    e.preventDefault()

    try {

      const response = await api.post(
        "/login",
        loginData
      )

      localStorage.setItem(
        "token",
        response.data.access_token
      )

      Swal.fire({

        icon: "success",

        title: "Bienvenido",
        text: "Inicio de sesión exitoso"
      })

      navigate("/dashboard")

    } catch (error) {

      Swal.fire({

        icon: "error",

        title: "Credenciales incorrectas"
      })
    }
  }

  // REGISTER

  const registrarUsuario = async (e) => {

    e.preventDefault()

    try {

      await api.post(
        "/usuarios/register",
        registerData
      )

      Swal.fire({

        icon: "success",

        title: "Cuenta creada correctamente"
      })

      setIsLogin(true)

    } catch (error) {

      Swal.fire({

        icon: "error",

        title: "Error registrando usuario"
      })
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-950 via-black to-blue-900 px-4">

      <div className="bg-white/95 backdrop-blur-md w-full max-w-md p-10 rounded-3xl shadow-2xl border border-white/20">

        {/* LOGO Y TITULO */}

        <div className="flex flex-col items-center mb-8">

          <img
            src={logo}
            alt="Chevrolet"
            className="w-32 mb-4 drop-shadow-lg"
          />

          <h1 className="text-4xl font-extrabold text-blue-700 text-center">

            Chevinario

          </h1>

          <p className="text-gray-500 mt-2 text-center">

            Sistema de Gestión Concesionario

          </p>

        </div>

        {/* LOGIN */}

        {isLogin ? (

          <form
            onSubmit={iniciarSesion}
          >

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">

              Iniciar Sesión

            </h2>

            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  correo: e.target.value
                })
              }
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="w-full border border-gray-300 p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value
                })
              }
            />

            <button
              className="w-full bg-blue-700 text-white p-3 rounded-xl font-semibold hover:bg-blue-800 transition duration-300 shadow-lg"
            >
              Ingresar
            </button>

            <p className="text-center mt-6 text-gray-600">

              ¿No tienes cuenta?

              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-blue-700 ml-2 font-semibold hover:underline"
              >
                Registrarse
              </button>

            </p>

          </form>

        ) : (

          // REGISTER

          <form
            onSubmit={registrarUsuario}
          >

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">

              Crear Cuenta

            </h2>

            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  nombre: e.target.value
                })
              }
            />

            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  correo: e.target.value
                })
              }
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password: e.target.value
                })
              }
            />

            <select
              className="w-full border border-gray-300 p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  id_rol: Number(e.target.value)
                })
              }
            >

              <option value="3">
                Usuario
              </option>

              <option value="4">
                Consultas
              </option>

            </select>

            <button
              className="w-full bg-green-600 text-white p-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-lg"
            >
              Crear Cuenta
            </button>

            <p className="text-center mt-6 text-gray-600">

              ¿Ya tienes cuenta?

              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-blue-700 ml-2 font-semibold hover:underline"
              >
                Ingresar
              </button>

            </p>

          </form>

        )}

      </div>

    </div>
  )
}

export default LoginPage