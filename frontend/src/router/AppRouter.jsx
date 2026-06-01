import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import ProtectedRoute from "../components/ProtectedRoute"

import LoginPage from "../pages/LoginPage"

import DashboardHome from "../pages/DashboardHome"

import ClientesPage from "../pages/ClientesPage"

import VehiculosPage from "../pages/VehiculosPage"

import DashboardLayout from "../layouts/DashboardLayout"

import UsuariosPage from "../pages/UsuariosPage"

import VentasPage from "../pages/VentasPage"

import PagosPage from "../pages/PagosPage"

import ReportesPage from "../pages/ReportesPage"

function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<DashboardHome />}
          />

          <Route
            path="clientes"
            element={<ClientesPage />}
          />

          <Route
            path="vehiculos"
            element={<VehiculosPage />}
          />

          <Route
            path="usuarios"
            element={<UsuariosPage />}
          />

          <Route
            path="ventas"
            element={<VentasPage />}
          />

          <Route
            path="pagos"
            element={<PagosPage />}
          />

          <Route
            path="reportes"
            element={<ReportesPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter