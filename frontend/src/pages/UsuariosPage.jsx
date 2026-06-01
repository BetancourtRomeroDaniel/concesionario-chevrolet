import { useEffect, useState } from "react"

import Swal from "sweetalert2"

import api from "../services/api"

function UsuariosPage() {

  const [usuarios, setUsuarios] = useState([])

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({

    nombre: "",
    correo: "",
    password: "",
    id_rol: 2
  })

  // OBTENER USUARIOS

  const obtenerUsuarios = async () => {

    try {

      const response = await api.get(
        "/usuarios"
      )

      setUsuarios(response.data)

    } catch (error) {

      console.log(error)

      Swal.fire({
        icon: "error",
        title: "Error cargando usuarios"
      })
    }
  }

  useEffect(() => {

    obtenerUsuarios()

  }, [])

  // CREAR USUARIO

  const crearUsuario = async (e) => {

    e.preventDefault()

    // VALIDACIONES

    if (
      !form.nombre ||
      !form.correo ||
      !form.password
    ) {

      Swal.fire({
        icon: "warning",
        title: "Todos los campos son obligatorios"
      })

      return
    }

    setLoading(true)

    try {

      await api.post(
        "/usuarios",
        {
          ...form,
          id_rol: Number(form.id_rol)
        }
      )

      Swal.fire({
        icon: "success",
        title: "Usuario creado"
      })

      // LIMPIAR FORM

      setForm({

        nombre: "",
        correo: "",
        password: "",
        id_rol: 2
      })

      obtenerUsuarios()

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error creando usuario"
      })

    } finally {

      setLoading(false)
    }
  }

  // ELIMINAR USUARIO

  const eliminarUsuario = async (id) => {

    const result = await Swal.fire({

      title: "¿Eliminar usuario?",

      text: "Esta acción no se puede deshacer",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Sí, eliminar",

      cancelButtonText: "Cancelar"
    })

    if (!result.isConfirmed) {

      return
    }

    try {

      await api.delete(
        `/usuarios/${id}`
      )

      Swal.fire({
        icon: "success",
        title: "Usuario eliminado"
      })

      obtenerUsuarios()

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar"
      })
    }
  }

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Usuarios
      </h1>

      {/* FORM */}

      <form
        onSubmit={crearUsuario}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                nombre: e.target.value
              })
            }
          />

          <input
            type="email"
            placeholder="Correo"
            value={form.correo}
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                correo: e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
          />

          <select
            value={form.id_rol}
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                id_rol: e.target.value
              })
            }
          >

            <option value="2">
              ADMINISTRADOR
            </option>

            <option value="3">
              USUARIO
            </option>

            <option value="4">
              CONSULTAS
            </option>

          </select>

        </div>

        <button

          disabled={loading}

          className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
            mt-6
            disabled:bg-gray-400
          "
        >

          {
            loading
              ? "Creando..."
              : "Crear Usuario"
          }

        </button>

      </form>

      {/* TABLA */}

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                Nombre
              </th>

              <th className="p-3 text-left">
                Correo
              </th>

              <th className="p-3 text-left">
                Rol
              </th>

              <th className="p-3 text-left">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {usuarios.map((usuario) => (

              <tr
                key={usuario.id_usuario}
                className="border-b"
              >

                <td className="p-3">
                  {usuario.nombre}
                </td>

                <td className="p-3">
                  {usuario.correo}
                </td>

                <td className="p-3">

                  {
                    usuario.id_rol === 1
                      ? "SUPERADMIN"
                      : usuario.id_rol === 2
                      ? "ADMIN"
                      : usuario.id_rol === 3
                      ? "USUARIO"
                      : "CONSULTAS"
                  }

                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      eliminarUsuario(
                        usuario.id_usuario
                      )
                    }
                    className="
                      bg-red-500
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default UsuariosPage