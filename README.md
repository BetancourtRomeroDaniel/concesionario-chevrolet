# 🚗 Sistema de Gestión de Ventas para Concesionario Chevrolet

Sistema web desarrollado para gestionar las principales operaciones de un concesionario de vehículos Chevrolet en Colombia.

El proyecto permite administrar usuarios, clientes, vehículos, ventas, pagos y financiación, además de generar facturas en PDF, códigos QR y reportes de información.

El sistema está dividido en un **frontend desarrollado con React** y un **backend desarrollado con FastAPI**, utilizando **PostgreSQL** como sistema de gestión de base de datos.

---

## 📌 Funcionalidades

* 🔐 Inicio de sesión mediante autenticación con JWT.
* 👥 Gestión de usuarios y roles.
* 👤 Gestión de clientes.
* 🚗 Gestión de vehículos.
* 💰 Registro y gestión de ventas.
* 💳 Gestión de pagos.
* 📄 Generación de facturas en PDF.
* 🔳 Generación de códigos QR.
* 📊 Dashboard y consultas.
* 📈 Generación de reportes de ventas.
* 🛡️ Validación de información.
* ⚠️ Manejo global de excepciones.
* 🔑 Control de acceso según el rol del usuario.

---

## 👤 Roles del sistema

El sistema cuenta con diferentes roles para controlar el acceso a las funcionalidades:

* **Superadmin**
* **Administrador**
* **Usuario**
* **Consultas**

Cada rol cuenta con diferentes permisos dentro de la aplicación.

---

## 🛠️ Tecnologías utilizadas

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic
* JWT
* Uvicorn
* Pillow

### Frontend

* React
* JavaScript
* Vite
* React Router
* Axios
* Tailwind CSS
* SweetAlert2

### Herramientas

* Git
* GitHub
* Visual Studio Code
* DBeaver
* Postman

---

## 🏗️ Estructura del proyecto

```text
concesionario-chevrolet/
│
├── backend/
│   ├── app/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── facturas/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .env.example
├── .gitignore
└── README.md
```

El backend utiliza una separación modular entre configuración, modelos, rutas y middleware.

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd concesionario-chevrolet
```

### 2. Configurar el backend

Ingresar a la carpeta del backend:

```bash
cd backend
```

Crear un entorno virtual:

```bash
python3 -m venv venv
```

Activar el entorno virtual.

**macOS / Linux:**

```bash
source venv/bin/activate
```

**Windows:**

```bash
venv\Scripts\activate
```

Instalar las dependencias:

```bash
pip install -r requirements.txt
```

---

## 🗄️ Configuración de PostgreSQL

El proyecto utiliza PostgreSQL como base de datos.

Crear una base de datos, por ejemplo:

```text
concesionario_chevrolet
```

Después crear el archivo:

```text
backend/.env
```

Tomando como referencia el archivo `.env.example`.

Ejemplo:

```env
DATABASE_URL=postgresql://USUARIO:CONTRASEÑA@localhost/NOMBRE_BASE_DATOS

SECRET_KEY=CAMBIAR_ESTA_CLAVE

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

> ⚠️ No subir el archivo `.env` a GitHub. Este archivo contiene información que debe mantenerse privada.

---

## ▶️ Ejecutar el backend

Desde la carpeta `backend`:

```bash
uvicorn main:app --reload
```

El servidor estará disponible normalmente en:

```text
http://127.0.0.1:8000
```

Documentación interactiva de FastAPI:

```text
http://127.0.0.1:8000/docs
```

---

## 💻 Ejecutar el frontend

Abrir una nueva terminal desde la carpeta raíz del proyecto e ingresar a:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

También están disponibles los siguientes comandos:

```bash
npm run build
npm run lint
npm run preview
```

---

## 🗃️ Base de datos

La aplicación utiliza:

* **PostgreSQL** para almacenar la información.
* **SQLAlchemy** como ORM.
* Modelos para representar las entidades principales del sistema.
* Validaciones para controlar la información registrada.

Al iniciar el backend, SQLAlchemy utiliza los modelos importados para crear las tablas que todavía no existan en la base de datos.

---

## 📄 Facturación

El sistema permite generar documentos de factura en formato PDF y códigos QR asociados a las facturas.

Dentro de:

```text
backend/facturas/
```

se encuentran archivos utilizados como datos de demostración del proyecto.

Los datos incluidos en estas facturas son **ficticios y utilizados únicamente con fines académicos y de demostración**.

---

## 🔐 Seguridad

El proyecto implementa diferentes mecanismos para proteger la aplicación:

* Autenticación mediante JWT.
* Control de acceso mediante roles.
* Variables de entorno para información sensible.
* Archivo `.gitignore` para evitar subir credenciales.
* Validación de datos.
* Manejo global de excepciones.

---

## 🎯 Objetivo del proyecto

El objetivo principal es desarrollar un sistema web que permita digitalizar y organizar diferentes procesos relacionados con la gestión de un concesionario de vehículos.

Además, el proyecto permitió aplicar conocimientos relacionados con:

* Desarrollo backend.
* Desarrollo frontend.
* Bases de datos.
* APIs REST.
* Autenticación y autorización.
* Validación de información.
* Generación de documentos.
* Control de versiones con Git y GitHub.

---

## 📚 Aprendizajes

Durante el desarrollo del proyecto se trabajó en la integración de diferentes tecnologías para construir una aplicación web completa, conectando el frontend, backend y base de datos.

También se adquirió experiencia en organización de proyectos, manejo de dependencias, variables de entorno, control de versiones y pruebas de las funcionalidades mediante herramientas como Postman y DBeaver.

---

## 👨‍💻 Autor

**Jeisson Daniel Betancourt Romero**

Estudiante de Ingeniería de Sistemas — ETITC

GitHub: **BetancourtRomeroDaniel**
