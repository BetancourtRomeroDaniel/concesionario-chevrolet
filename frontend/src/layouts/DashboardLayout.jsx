import { Link, Outlet, useNavigate } from "react-router-dom"

import { getUserData } from "../utils/auth"

import logo from "../assets/chevrolet.png"

function DashboardLayout() {

  const navigate = useNavigate()

  // OBTENER DATOS USUARIO DESDE JWT
  const user = getUserData()

  const logout = () => {

    localStorage.removeItem("token")

    navigate("/")
  }

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <div className="w-72 bg-gradient-to-b from-blue-900 to-black text-white p-6 shadow-2xl">

        {/* LOGO */}

        <div className="flex flex-col items-center mb-12">

          <img
            src={logo}
            alt="Chevrolet"
            className="w-28 mb-4"
          />

          <h1 className="text-2xl font-bold text-center">

            Chevinario

          </h1>

        </div>

        {/* MENU */}

        <nav className="flex flex-col gap-4">

          <Link
            to="/dashboard"
            className="hover:bg-blue-800 transition p-3 rounded-xl"
          >
            Dashboard
          </Link>

          <Link
            to="/dashboard/clientes"
            className="hover:bg-blue-800 transition p-3 rounded-xl"
          >
            Clientes
          </Link>

          <Link
            to="/dashboard/vehiculos"
            className="hover:bg-blue-800 transition p-3 rounded-xl"
          >
            Vehículos
          </Link>

          {/* SOLO SUPERADMIN */}

          {user?.id_rol === 1 && (

            <Link
              to="/dashboard/usuarios"
              className="hover:bg-blue-800 transition p-3 rounded-xl"
            >
              Usuarios
            </Link>

          )}

          {/* ADMIN Y SUPERADMIN */}

          {(user?.id_rol === 1 ||
            user?.id_rol === 2) && (
            
            <>  

              <Link
                to="/dashboard/ventas"
                className="hover:bg-blue-800 transition p-3 rounded-xl"
              >
                Ventas
              </Link>

              <Link
                to="/dashboard/reportes"
                className="hover:bg-blue-800 transition p-3 rounded-xl"
              >
                Reportes
              </Link>

            </>
            )}

          {/* TODOS MENOS CONSULTAS */}

          {user?.id_rol !== 4 && (

            <Link
              to="/dashboard/pagos"
              className="hover:bg-blue-800 transition p-3 rounded-xl"
            >
              Pagos
            </Link>

          )}

          {/* INFO USUARIO */}

          <div className="mt-10 bg-white/10 p-4 rounded-xl">

            <p className="text-sm text-gray-300">

              Sesión iniciada:

            </p>

            <p className="font-bold mt-1">

              {user?.sub}

            </p>

          </div>

          {/* BOTON LOGOUT */}

          <button
            onClick={logout}
            className="bg-red-500 p-3 rounded-xl mt-8 hover:bg-red-600 transition"
          >
            Cerrar Sesión
          </button>

        </nav>

      </div>

      {/* CONTENIDO */}

      <div className="flex-1 p-10 overflow-auto">

        <Outlet />

      </div>

    </div>
  )
}

export default DashboardLayout