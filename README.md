# 🛍️ Proyecto de Gestión de Productos

Este repositorio contiene **DOS proyectos independientes** para gestionar productos usando la API de FakeStore:

## 📁 Estructura del Repositorio

```
ProjectJS/
├── CLI-Project/              # Proyecto CLI (Línea de Comandos)
│   ├── index.js
│   ├── package.json
│   └── README.md
│
└── REST-API-Server/          # Proyecto REST API con Express
    ├── server.js
    ├── controllers/
    ├── routes/
    ├── data/
    ├── middleware/
    ├── test-api.html
    ├── package.json
    └── README.md (este archivo está en la raíz)
```

---

## 1️⃣ CLI-Project (Línea de Comandos)

### 📖 Descripción
Programa de terminal que permite interactuar con FakeStore API mediante comandos.

### 🚀 Uso Rápido

```bash
cd CLI-Project
npm install

# Comandos disponibles:
npm run start GET products
npm run start GET products/15
npm run start POST products T-Shirt-Rex 300 remeras
npm run start DELETE products/7
```

### ✅ Características
- ✅ Usa `process.argv` para capturar comandos
- ✅ Peticiones asíncronas con `fetch`
- ✅ Destructuring y spread operator
- ✅ Métodos de arrays y strings
- ✅ Consume FakeStore API directamente

📚 **[Ver documentación completa en CLI-Project/README.md](./CLI-Project/README.md)**

---

## 2️⃣ REST API Server (Servidor Express)

### 📖 Descripción
Servidor REST API completo con Express.js que actúa como proxy de FakeStore API, permitiendo operaciones CRUD con interfaz web.

### 🚀 Uso Rápido

```bash
# Desde la raíz del proyecto
npm install
npm run dev

# El servidor inicia en http://localhost:3000
# Abre test-api.html en tu navegador para la interfaz visual
```

### ✅ Características
- ✅ Servidor Express con CORS
- ✅ 6 endpoints REST (GET, POST, PUT, PATCH, DELETE)
- ✅ Interfaz web visual (test-api.html)
- ✅ Cache inteligente de productos
- ✅ Modificaciones locales en memoria
- ✅ Validación de datos
- ✅ Manejo de errores centralizado

### 📡 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:id` | Obtener producto por ID |
| POST | `/api/products` | Crear nuevo producto |
| PUT | `/api/products/:id` | Actualizar producto completo |
| PATCH | `/api/products/:id` | Actualizar producto parcial |
| DELETE | `/api/products/:id` | Eliminar producto |

### 🌐 Interfaz Web
Abre `test-api.html` en tu navegador para una interfaz visual completa con:
- Vista de productos en tarjetas
- Formularios para crear/editar
- Botones para todas las operaciones CRUD
- Visualización de respuestas JSON

---

## 🔧 Tecnologías Utilizadas

### CLI-Project
- Node.js
- ES Modules
- node-fetch
- FakeStore API

### REST API Server
- Node.js
- Express.js
- CORS
- Axios
- node-fetch
- Nodemon (desarrollo)

---

## 📝 Notas Importantes

1. **Proyectos Independientes**: Cada proyecto tiene su propio `package.json` y dependencias
2. **FakeStore API**: Ambos proyectos consumen la API pública de FakeStore
3. **Datos Simulados**: Las operaciones POST/PUT/DELETE son simuladas por FakeStore API
4. **Conexión Internet**: Se requiere conexión para ambos proyectos

---

## 🎓 Propósito Académico

- **CLI-Project**: Cumple con los requerimientos de la Pre-Entrega del curso
- **REST API Server**: Proyecto adicional que demuestra arquitectura REST completa

---

## 📄 Licencia

ISC

---

**Desarrollado con ❤️ usando Node.js**