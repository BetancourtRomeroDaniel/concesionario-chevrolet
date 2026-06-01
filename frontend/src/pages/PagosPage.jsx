import { useEffect, useState } from "react"

import Swal from "sweetalert2"

import api from "../services/api"

function PagosPage() {

  const [pagos, setPagos] = useState([])

  const [ventas, setVentas] = useState([])

  const [form, setForm] = useState({

    id_venta: "",

    metodo_pago: "EFECTIVO",

    valor: ""
  })

  const obtenerPagos = async () => {

    try {

      const response = await api.get("/pagos")

      setPagos(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  const obtenerVentas = async () => {

    try {

      const response = await api.get("/ventas")

      setVentas(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    obtenerPagos()

    obtenerVentas()

  }, [])

  const registrarPago = async (e) => {

    e.preventDefault()

    try {

      await api.post("/pagos", {

        id_venta: Number(form.id_venta),

        metodo_pago: form.metodo_pago,

        valor: Number(form.valor)

      })

      Swal.fire({

        icon: "success",

        title: "Pago registrado"
      })

      obtenerPagos()

    } catch (error) {

      Swal.fire({

        icon: "error",

        title: "Error registrando pago"
      })
    }
  }

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Pagos
      </h1>

      <form
        onSubmit={registrarPago}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >

        <div className="grid grid-cols-3 gap-4">

          <select
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                id_venta: e.target.value
              })
            }
          >

            <option>
              Seleccione venta
            </option>

            {ventas.map((venta) => (

              <option
                key={venta.id_venta}
                value={venta.id_venta}
              >
                Venta #{venta.id_venta}
              </option>

            ))}

          </select>

          <select
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                metodo_pago: e.target.value
              })
            }
          >

            <option value="EFECTIVO">
              Efectivo
            </option>

            <option value="TARJETA">
              Tarjeta
            </option>

            <option value="TRANSFERENCIA">
              Transferencia
            </option>

          </select>

          <input
            type="number"
            placeholder="Valor"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                valor: e.target.value
              })
            }
          />

        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6"
        >
          Registrar Pago
        </button>

      </form>

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                ID
              </th>

              <th className="p-3 text-left">
                Venta
              </th>

              <th className="p-3 text-left">
                Método
              </th>

              <th className="p-3 text-left">
                Valor
              </th>

              <th className="p-3 text-left">
                Estado
              </th>

            </tr>

          </thead>

          <tbody>

            {pagos.map((pago) => (

              <tr
                key={pago.id_pago}
                className="border-b"
              >

                <td className="p-3">
                  {pago.id_pago}
                </td>

                <td className="p-3">
                  {pago.id_venta}
                </td>

                <td className="p-3">
                  {pago.metodo_pago}
                </td>

                <td className="p-3">
                  {Number(pago.monto).toLocaleString("es-CO")}
                </td>

                <td className="p-3">
                  {pago.estado_pago}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default PagosPage