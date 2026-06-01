import { useEffect, useState } from "react"

import api from "../services/api"

import Swal from "sweetalert2"

function ClientesPage() {

  const [clientes, setClientes] = useState([])

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({

    cedula: "",
    nombre: "",
    telefono: "",
    correo: "",
    direccion: ""
  })

  // LISTAR CLIENTES

  const obtenerClientes = async () => {

    try {

      const response = await api.get("/clientes")

      setClientes(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    obtenerClientes()

  }, [])

  // CREAR CLIENTE

const crearCliente = async (e) => {

  e.preventDefault()

  setLoading(true)

  // VALIDACIÓN

  if (
    !form.cedula ||
    !form.nombre ||
    !form.telefono ||
    !form.correo ||
    !form.direccion
  ) {

    Swal.fire({
      icon: "warning",
      title: "Campos obligatorios",
      text: "Completa todos los campos"
    })

    setLoading(false)

    return
  }

  try {

    await api.post(
      "/clientes",
      form
    )

    Swal.fire({
      icon: "success",
      title: "Cliente creado"
    })

    setForm({
      cedula: "",
      nombre: "",
      telefono: "",
      correo: "",
      direccion: ""
    })

    obtenerClientes()

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Error creando cliente"
    })

  } finally {

    setLoading(false)
  }
}

// ELIMINAR CLIENTE

const eliminarCliente = async (id) => {

  const result = await Swal.fire({

    title: "¿Eliminar cliente?",

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

    await api.delete(`/clientes/${id}`)

    Swal.fire({
      icon: "success",
      title: "Cliente eliminado"
    })

    obtenerClientes()

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
      Clientes
    </h1>

    {/* FORMULARIO */}

    <form
      onSubmit={crearCliente}
      className="bg-white p-6 rounded-xl shadow mb-10"
    >

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Cedula"
          value={form.cedula}
          onChange={(e) =>
            setForm({
              ...form,
              cedula: e.target.value
            })
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) =>
            setForm({
              ...form,
              nombre: e.target.value
            })
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Telefono"
          value={form.telefono}
          onChange={(e) =>
            setForm({
              ...form,
              telefono: e.target.value
            })
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Correo"
          value={form.correo}
          onChange={(e) =>
            setForm({
              ...form,
              correo: e.target.value
            })
          }
          className="border p-3 rounded-lg"
        />

      </div>

      <input
        type="text"
        placeholder="Direccion"
        value={form.direccion}
        onChange={(e) =>
          setForm({
            ...form,
            direccion: e.target.value
          })
        }
        className="border p-3 rounded-lg w-full mt-4"
      />

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
            : "Crear Cliente"
        }

      </button>

    </form>

    {/* TABLA */}

    <div className="bg-white p-6 rounded-xl shadow">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left p-3">
              ID
            </th>

            <th className="text-left p-3">
              Nombre
            </th>

            <th className="text-left p-3">
              Correo
            </th>

            <th className="text-left p-3">
              Teléfono
            </th>

            <th className="text-left p-3">
              Acciones
            </th>

          </tr>

        </thead>

        <tbody>

          {clientes.map((cliente) => (

            <tr
              key={cliente.id_cliente}
              className="border-b"
            >

              <td className="p-3">
                {cliente.id_cliente}
              </td>

              <td className="p-3">
                {cliente.nombre}
              </td>

              <td className="p-3">
                {cliente.correo}
              </td>

              <td className="p-3">
                {cliente.telefono}
              </td>

              <td className="p-3">

                <button
                  onClick={() =>
                    eliminarCliente(cliente.id_cliente)
                  }
                  className="
                    bg-red-500
                    hover:bg-red-600
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
export default ClientesPage