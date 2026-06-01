import { useEffect, useState } from "react"

import api from "../services/api"

function ReportesPage() {

  const [reportes, setReportes] = useState({

    total_ventas: 0,

    ingresos: 0,

    vehiculos_vendidos: 0
  })

  const obtenerReportes = async () => {

    try {

      const response = await api.get(
        "/reportes"
      )

      setReportes(
        response.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    obtenerReportes()

  }, [])

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">

        Reportes

      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-gray-500">

            Total Ventas

          </h2>

          <p className="text-5xl font-bold mt-4">

            {reportes.total_ventas}

          </p>

        </div>

        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-gray-500">

            Ingresos Totales

          </h2>

          <p className="text-4xl font-bold mt-4">

            $
            {Number(
              reportes.ingresos
            ).toLocaleString("es-CO")}

          </p>

        </div>

        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-gray-500">

            Vehículos Vendidos

          </h2>

          <p className="text-5xl font-bold mt-4">

            {reportes.vehiculos_vendidos}

          </p>

        </div>

      </div>

    </div>
  )
}

export default ReportesPage