import { useEffect, useState } from "react"

import api from "../services/api"


function DashboardHome() {

    const [stats, setStats] = useState({

        clientes: 0,
        vehiculos: 0,
        ventas: 0,
        stock: 0
    })

    const obtenerStats = async () => {

        try {

            const response = await api.get(
                "/dashboard/stats"
            )

            setStats(response.data)

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {

        obtenerStats()

    }, [])

    return (

        <div>

            <h1 className="text-4xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Clientes
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {stats.clientes}
                    </p>

                </div>

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Vehículos
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {stats.vehiculos}
                    </p>

                </div>

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Ventas
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {stats.ventas}
                    </p>

                </div>

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Stock Total
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {stats.stock}
                    </p>

                </div>

            </div>

        </div>
    )
}

export default DashboardHome