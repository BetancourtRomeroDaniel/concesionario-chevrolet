import { useEffect, useState } from "react"

import Swal from "sweetalert2"

import api from "../services/api"

function VentasPage() {

  const [ventas, setVentas] = useState([])

  const [clientes, setClientes] = useState([])

  const [vehiculos, setVehiculos] = useState([])

  const [form, setForm] = useState({

    id_cliente: "",
    id_vehiculo: "",
    cantidad: 1
  })

  const obtenerVentas = async () => {

    try {

      const response = await api.get("/ventas")

      setVentas(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  const obtenerClientes = async () => {

    try {

      const response = await api.get("/clientes")

      setClientes(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  const obtenerVehiculos = async () => {

    try {

      const response = await api.get("/vehiculos")

      setVehiculos(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    obtenerVentas()

    obtenerClientes()

    obtenerVehiculos()

  }, [])

  const crearVenta = async (e) => {

    e.preventDefault()

    console.log({
      id_cliente: Number(form.id_cliente),
      id_vehiculo: Number(form.id_vehiculo),
      cantidad: Number(form.cantidad)
    })

    try {

      await api.post("/ventas", {

        id_cliente: Number(form.id_cliente),

        id_vehiculo: Number(form.id_vehiculo),

        cantidad: Number(form.cantidad)
      })

      Swal.fire({

        icon: "success",

        title: "Venta registrada"
      })

      obtenerVentas()

    } catch (error) {

      Swal.fire({

        icon: "error",

        title: "Error registrando venta"
      })
    }
  }
  const descargarFactura = async (idVenta) => {

    console.log("CLICK FACTURA", idVenta)

    try {

      const token = localStorage.getItem(
        "token"
      )

      const response = await fetch(

        `http://127.0.0.1:8000/facturas/${idVenta}`,

        {

          method: "GET",

          headers: {

            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {

        throw new Error(
          "Error descargando factura"
        )
      }

      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)

      const link = document.createElement("a")

      link.href = url

      link.download = `factura_${idVenta}.pdf`

      document.body.appendChild(link)

      link.click()

      link.remove()

    } catch (error) {

      console.error(error)

      Swal.fire({

        icon: "error",

        title: "Error descargando factura"
      })
    }
  }

  console.log("CLIENTES", clientes)
  console.log("VEHICULOS", vehiculos)

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Ventas
      </h1>

      {/* FORM */}

      <form
        onSubmit={crearVenta}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >

        <div className="grid grid-cols-3 gap-4">

          <select
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                id_cliente: e.target.value
              })
            }
          >

            <option value="">
              Seleccione cliente
            </option>

            {clientes.map((cliente) => (

              <option
                key={cliente.id_cliente}
                value={cliente.id_cliente}
              >
                {cliente.nombre}
              </option>

            ))}

          </select>

          <select
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                id_vehiculo: e.target.value
              })
            }
          >

            <option value="">
              Seleccione vehículo
            </option>

            {vehiculos.map((vehiculo) => (

              <option
                key={vehiculo.id_vehiculo}
                value={vehiculo.id_vehiculo}
              >
                {vehiculo.modelo}
              </option>

            ))}

          </select>

          <input
            type="number"
            min="1"
            value={form.cantidad}
            placeholder="Cantidad"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                cantidad: e.target.value
              })
            }
          />

        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6"
        >
          Registrar Venta
        </button>

      </form>


      {/* TABLA */}

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                ID
              </th>

              <th className="p-3 text-left">
                Cliente
              </th>

              <th className="p-3 text-left">
                Vehículo
              </th>

              <th className="p-3 text-left">
                Total
              </th>

              <th className="p-3 text-left">
                Fecha
              </th>

              <th className="p-3 text-left">
                Cantidad
              </th>

              <th className="p-3 text-left">
                Vendedor
              </th>

              <th className="p-3 text-left">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {ventas.map((venta) => (

              <tr
                key={venta.id_venta}
                className="border-b"
              >

                <td className="p-3">
                  {venta.id_venta}
                </td>

                <td className="p-3">
                  {venta.cliente}
                </td>

                <td className="p-3">
                  {venta.vehiculo}
                </td>

                <td className="p-3">
                  {Number(venta.total).toLocaleString(
                    "es-CO",
                    {
                      style: "currency",
                      currency: "COP"
                    }
                  )}
                </td>

                <td className="p-3">
                  {new Date(
                    venta.fecha_venta
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {venta.cantidad}
                </td>

                <td className="p-3">
                  {venta.vendedor}
                </td>

                <td className="p-3">

                  <button
                    type="button"
                    onClick={() =>
                      descargarFactura(
                        venta.id_venta
                      )
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Descargar Factura
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
export default VentasPage