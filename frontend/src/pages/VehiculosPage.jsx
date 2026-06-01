import { useEffect, useState } from "react"

import Swal from "sweetalert2"

import api from "../services/api"

function VehiculosPage() {

  const [vehiculos, setVehiculos] = useState([])

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({

    placa: "",
    modelo: "",
    marca: "",
    anio: "",
    color: "",
    precio: "",
    stock: ""
  })

  // LISTAR VEHICULOS

  const obtenerVehiculos = async () => {

    try {

      const response = await api.get(
        "/vehiculos"
      )

      setVehiculos(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    obtenerVehiculos()

  }, [])

  // CREAR VEHICULO

  const crearVehiculo = async (e) => {

  e.preventDefault()

  if (
    !form.placa ||
    !form.modelo ||
    !form.marca ||
    !form.anio ||
    !form.precio ||
    !form.stock
  ) {

    Swal.fire({
      icon: "warning",
      title: "Campos obligatorios",
      text: "Completa todos los campos"
    })

    return
  }

  // STOCK NEGATIVO

  if (form.stock < 0) {

    Swal.fire({
      icon: "error",
      title: "Stock inválido",
      text: "El stock no puede ser negativo"
    })

    return
  }

  // PRECIO INVALIDO

  if (form.precio <= 0) {

    Swal.fire({
      icon: "error",
      title: "Precio inválido",
      text: "El precio debe ser mayor a 0"
    })

    return
  }

  setLoading(true)

  try {

    await api.post(
      "/vehiculos",
      {
        ...form,
        anio: Number(form.anio),
        precio: Number(form.precio),
        stock: Number(form.stock)
      }
    )

    Swal.fire({
      icon: "success",
      title: "Vehículo creado"
    })

    setForm({
      placa: "",
      modelo: "",
      marca: "",
      anio: "",
      color: "",
      precio: "",
      stock: ""
    })

    obtenerVehiculos()

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Error creando vehículo"
    })

  } finally {

    setLoading(false)
  }
}

  // ELIMINAR

  const eliminarVehiculo = async (id) => {

  const result = await Swal.fire({

    title: "¿Eliminar vehículo?",

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
      `/vehiculos/${id}`
    )

    Swal.fire({
      icon: "success",
      title: "Vehículo eliminado"
    })

    obtenerVehiculos()

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
        Vehículos
      </h1>

      {/* FORMULARIO */}

      <form
        onSubmit={crearVehiculo}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Placa"
            value={form.placa}
            onChange={(e) =>
              setForm({
                ...form,
                placa: e.target.value
              })
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Modelo"
            value={form.modelo}
            onChange={(e) =>
              setForm({
                ...form,
                modelo: e.target.value
              })
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Marca"
            value={form.marca}
            onChange={(e) =>
              setForm({
                ...form,
                marca: e.target.value
              })
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Año"
            value={form.anio}
            onChange={(e) =>
              setForm({
                ...form,
                anio: e.target.value
              })
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Color"
            value={form.color}
            onChange={(e) =>
              setForm({
                ...form,
                color: e.target.value
              })
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Precio"
            value={form.precio}
            onChange={(e) =>
              setForm({
                ...form,
                precio: e.target.value
              })
            }
            className="border p-3 rounded-lg"
          />

        </div>

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock: e.target.value
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
            disabled:cursor-not-allowed
          "
        >

          {
            loading
              ? "Creando..."
              : "Crear Vehículo"
          }

        </button>

      </form>

      {/* TABLA */}

      <div className="bg-white p-6 rounded-xl shadow overflow-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                Modelo
              </th>

              <th className="p-3 text-left">
                Marca
              </th>

              <th className="p-3 text-left">
                Año
              </th>

              <th className="p-3 text-left">
                Precio
              </th>

              <th className="p-3 text-left">
                Stock
              </th>

              <th className="p-3 text-left">
                Estado
              </th>

              <th className="p-3 text-left">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {vehiculos.map((vehiculo) => (

              <tr
                key={vehiculo.id_vehiculo}
                className="border-b"
              >

                <td className="p-3">
                  {vehiculo.modelo}
                </td>

                <td className="p-3">
                  {vehiculo.marca}
                </td>

                <td className="p-3">
                  {vehiculo.anio}
                </td>

                <td className="p-3">
                  ${vehiculo.precio}
                </td>

                <td className="p-3">
                  {vehiculo.stock}
                </td>

                <td className="p-3">

                  <span
                    className={
                      vehiculo.stock > 0
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                        : "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                    }
                  >
                    {vehiculo.stock > 0
                      ? "Disponible"
                      : "Agotado"}
                  </span>

                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      eliminarVehiculo(
                        vehiculo.id_vehiculo
                      )
                    }
                    className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      transition
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

export default VehiculosPage