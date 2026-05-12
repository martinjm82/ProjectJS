# 🛍️ API REST de Productos - Node.js + Express

API REST completa para gestión de productos con operaciones CRUD (Crear, Leer, Actualizar, Eliminar) implementada en Node.js con Express.js.

## 📋 Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar productos
- ✅ **Almacenamiento en Memoria**: Datos persistentes durante la ejecución del servidor
- ✅ **Validación de Datos**: Verificación de campos requeridos y tipos de datos
- ✅ **Manejo de Errores**: Respuestas HTTP apropiadas y mensajes descriptivos
- ✅ **Arquitectura MVC**: Separación de responsabilidades (Rutas, Controladores, Datos)
- ✅ **ES6 Modules**: Uso de import/export moderno

## 🚀 Instalación

```bash
# Clonar el repositorio o navegar al directorio del proyecto
cd ProjectJS

# Instalar dependencias
npm install

# Iniciar el servidor en modo desarrollo (con auto-reload)
npm run dev

# O iniciar en modo producción
npm start
```

El servidor se iniciará en `http://localhost:3000`

## 📡 Endpoints de la API

### Base URL
```
http://localhost:3000/api/products
```

### 1. Obtener todos los productos
```http
GET /api/products
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "title": "Laptop HP Pavilion",
      "price": 899.99,
      "description": "Laptop de alto rendimiento con procesador Intel Core i7",
      "category": "electronics",
      "image": "https://via.placeholder.com/300x300?text=Laptop"
    }
  ]
}
```

### 2. Obtener un producto por ID
```http
GET /api/products/:id
```

**Ejemplo:**
```bash
curl http://localhost:3000/api/products/1
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Laptop HP Pavilion",
    "price": 899.99,
    "description": "Laptop de alto rendimiento con procesador Intel Core i7",
    "category": "electronics",
    "image": "https://via.placeholder.com/300x300?text=Laptop"
  }
}
```

**Respuesta error (404):**
```json
{
  "success": false,
  "error": "Producto con ID 999 no encontrado"
}
```

### 3. Crear un nuevo producto
```http
POST /api/products
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "Smartphone Samsung Galaxy",
  "price": 699.99,
  "description": "Smartphone de última generación con cámara de 108MP",
  "category": "electronics",
  "image": "https://via.placeholder.com/300x300?text=Phone"
}
```

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Smartphone Samsung Galaxy",
    "price": 699.99,
    "description": "Smartphone de última generación",
    "category": "electronics"
  }'
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {
    "id": 6,
    "title": "Smartphone Samsung Galaxy",
    "price": 699.99,
    "description": "Smartphone de última generación",
    "category": "electronics",
    "image": "https://via.placeholder.com/300x300?text=Product"
  }
}
```

**Respuesta error (400):**
```json
{
  "success": false,
  "error": "Datos inválidos",
  "details": [
    "El título es requerido y debe ser un texto válido",
    "El precio es requerido y debe ser un número mayor a 0"
  ]
}
```

### 4. Actualizar completamente un producto (PUT)
```http
PUT /api/products/:id
Content-Type: application/json
```

**Body (JSON) - Todos los campos son requeridos:**
```json
{
  "title": "Laptop HP Pavilion Actualizada",
  "price": 799.99,
  "description": "Laptop actualizada con mejor precio",
  "category": "electronics",
  "image": "https://via.placeholder.com/300x300?text=Laptop-Updated"
}
```

**Ejemplo con curl:**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Laptop HP Pavilion Actualizada",
    "price": 799.99,
    "description": "Laptop actualizada con mejor precio",
    "category": "electronics",
    "image": "https://via.placeholder.com/300x300?text=Laptop-Updated"
  }'
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Producto actualizado exitosamente",
  "data": {
    "id": 1,
    "title": "Laptop HP Pavilion Actualizada",
    "price": 799.99,
    "description": "Laptop actualizada con mejor precio",
    "category": "electronics",
    "image": "https://via.placeholder.com/300x300?text=Laptop-Updated"
  }
}
```

### 5. Actualizar parcialmente un producto (PATCH)
```http
PATCH /api/products/:id
Content-Type: application/json
```

**Body (JSON) - Solo los campos que deseas actualizar:**
```json
{
  "price": 749.99
}
```

**Ejemplo con curl:**
```bash
curl -X PATCH http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 749.99}'
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Producto actualizado parcialmente",
  "data": {
    "id": 1,
    "title": "Laptop HP Pavilion",
    "price": 749.99,
    "description": "Laptop de alto rendimiento con procesador Intel Core i7",
    "category": "electronics",
    "image": "https://via.placeholder.com/300x300?text=Laptop"
  }
}
```

### 6. Eliminar un producto
```http
DELETE /api/products/:id
```

**Ejemplo con curl:**
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Producto con ID 1 eliminado exitosamente"
}
```

**Respuesta error (404):**
```json
{
  "success": false,
  "error": "Producto con ID 999 no encontrado"
}
```

## 📊 Estructura del Proyecto

```
ProjectJS/
├── server.js                      # Servidor Express principal
├── index.js                       # Script original (mantener como referencia)
├── package.json                   # Dependencias y scripts
├── README.md                      # Documentación
├── controllers/
│   └── products.controller.js     # Lógica de negocio de productos
├── routes/
│   └── products.routes.js         # Definición de rutas
├── data/
│   └── products.js                # Almacenamiento en memoria
├── middleware/
│   └── errorHandler.js            # Manejo de errores
├── services/
│   └── api.js                     # Servicios externos (FakeStore API)
└── utils/
    └── formatter.js               # Utilidades de formato
```

## 🔧 Validaciones

### Campos Requeridos para Crear/Actualizar (PUT):
- `title` (string): Título del producto
- `price` (number): Precio mayor a 0
- `description` (string): Descripción del producto
- `category` (string): Categoría del producto
- `image` (string, opcional): URL de la imagen

### Campos Opcionales para Actualización Parcial (PATCH):
Puedes enviar solo los campos que deseas actualizar.

## 🧪 Probar la API

### Usando curl (Terminal)

```bash
# Obtener todos los productos
curl http://localhost:3000/api/products

# Obtener un producto específico
curl http://localhost:3000/api/products/1

# Crear un producto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"Nuevo Producto","price":99.99,"description":"Descripción","category":"test"}'

# Actualizar completamente
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Actualizado","price":199.99,"description":"Nueva desc","category":"test"}'

# Actualizar parcialmente
curl -X PATCH http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":149.99}'

# Eliminar un producto
curl -X DELETE http://localhost:3000/api/products/1
```

### Usando Postman o Thunder Client

1. Importa la colección de endpoints
2. Configura la base URL: `http://localhost:3000`
3. Prueba cada endpoint según la documentación

### Usando JavaScript (fetch)

```javascript
// Obtener todos los productos
fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => console.log(data));

// Crear un producto
fetch('http://localhost:3000/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Nuevo Producto',
    price: 99.99,
    description: 'Descripción del producto',
    category: 'electronics'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Actualizar parcialmente
fetch('http://localhost:3000/api/products/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ price: 149.99 })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Eliminar un producto
fetch('http://localhost:3000/api/products/1', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## 📝 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos o faltantes |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript
- **Express.js**: Framework web minimalista
- **ES6 Modules**: Sistema de módulos moderno
- **Nodemon**: Auto-reload durante el desarrollo

## 📚 Scripts Disponibles

```bash
# Iniciar servidor en modo producción
npm start

# Iniciar servidor en modo desarrollo (auto-reload)
npm run dev
```

## 🔄 Diferencia entre PUT y PATCH

- **PUT**: Reemplaza completamente el recurso. Todos los campos son requeridos.
- **PATCH**: Actualiza parcialmente el recurso. Solo envía los campos que deseas cambiar.

## 💡 Notas Importantes

- Los datos se almacenan en memoria, por lo que se perderán al reiniciar el servidor
- Los IDs se generan automáticamente de forma incremental
- La imagen es opcional; si no se proporciona, se usa un placeholder
- El servidor incluye logging de todas las peticiones HTTP

## 🤝 Contribuir

Si deseas mejorar esta API, puedes:
1. Agregar persistencia en base de datos (MongoDB, PostgreSQL)
2. Implementar autenticación con JWT
3. Agregar paginación y filtros
4. Implementar búsqueda de productos
5. Agregar tests unitarios

## 📄 Licencia

ISC

---

Desarrollado con ❤️ usando Node.js y Express.js