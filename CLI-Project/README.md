# 🛍️ Gestor de Productos - CLI para FakeStore API

Proyecto de línea de comandos (CLI) para gestionar productos de una tienda en línea utilizando la API de FakeStore.

## 📋 Descripción del Proyecto

Este proyecto es una herramienta de terminal que permite interactuar con la API de FakeStore para realizar operaciones CRUD (Crear, Leer, Eliminar) sobre productos. Desarrollado como parte de la Pre-Entrega del curso de Node.js.

## ✅ Requerimientos Cumplidos

### Requerimiento #1: Configuración Inicial ✓

- ✅ Directorio del proyecto creado con `index.js` como punto de entrada
- ✅ Node.js inicializado con `npm init -y`
- ✅ Propiedad `"type": "module"` agregada en `package.json` para ESModules
- ✅ Script `start` configurado para ejecutar con `npm run start`

### Requerimiento #2: Lógica de Gestión de Productos ✓

- ✅ **GET products**: Consultar todos los productos
- ✅ **GET products/<id>**: Consultar un producto específico
- ✅ **POST products**: Crear un nuevo producto
- ✅ **DELETE products/<id>**: Eliminar un producto

## 🚀 Instalación

```bash
# Clonar o descargar el proyecto
cd ProjectJS

# Instalar dependencias
npm install

# El proyecto está listo para usar
```

## 📖 Uso del Programa

### 1. Consultar Todos los Productos

```bash
npm run start GET products
```

**Salida esperada:**
```
📦 Consultando todos los productos...

✅ Se encontraron 20 productos:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ID: 1 | Fjallraven - Foldsack No. 1 Backpack - $109.95
ID: 2 | Mens Casual Premium Slim Fit T-Shirts - $22.3
...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2. Consultar un Producto Específico

```bash
npm run start GET products/15
```

**Salida esperada:**
```
🔍 Consultando producto con ID: 15...

✅ Producto encontrado:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ID:          15
Título:      BIYLACLESEN Women's 3-in-1 Snowboard Jacket
Precio:      $56.99
Categoría:   women's clothing
Descripción: Note:The Jackets is US standard size...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3. Crear un Producto Nuevo

```bash
npm run start POST products T-Shirt-Rex 300 remeras
```

**Parámetros:**
- `T-Shirt-Rex`: Título del producto
- `300`: Precio del producto
- `remeras`: Categoría del producto

**Salida esperada:**
```
➕ Creando nuevo producto...

✅ Producto creado exitosamente:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ID:        21
Título:    T-Shirt-Rex
Precio:    $300
Categoría: remeras
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4. Eliminar un Producto

```bash
npm run start DELETE products/7
```

**Salida esperada:**
```
🗑️  Eliminando producto con ID: 7...

✅ Producto eliminado exitosamente:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ID eliminado: 7
Respuesta de la API: {...}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🔧 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript
- **ES Modules**: Sistema de módulos moderno (`import/export`)
- **node-fetch**: Librería para realizar peticiones HTTP
- **FakeStore API**: API REST para datos de productos de prueba

## 📚 Conceptos Aplicados

### 1. process.argv
Utilizado para capturar y procesar los comandos ingresados desde la terminal:

```javascript
const [, , method, resource, ...params] = process.argv;
```

### 2. fetch (Peticiones Asíncronas)
Implementado para interactuar con la API de FakeStore:

```javascript
const response = await fetch('https://fakestoreapi.com/products');
const products = await response.json();
```

### 3. Destructuring y Spread Operator
Usado para manipular datos de forma eficiente:

```javascript
const [title, price, category] = params;
const newProduct = { title, price, category, ...otherData };
```

### 4. Métodos de Arrays y Strings
Aplicados para separar y procesar información:

```javascript
const parts = resource.split('/');
const [resourceName, productId] = parts;
```

### 5. Async/Await
Manejo de operaciones asíncronas de forma clara:

```javascript
async function handleGet(resource) {
  const response = await fetch(API_URL);
  const data = await response.json();
}
```

## 📁 Estructura del Proyecto

```
ProjectJS/
├── index.js              # Punto de entrada del programa CLI
├── package.json          # Configuración y dependencias
├── package-lock.json     # Lock file de dependencias
├── README.md             # Documentación del proyecto
└── .gitignore           # Archivos ignorados por Git
```

## 🎯 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run start GET products` | Lista todos los productos |
| `npm run start GET products/<id>` | Obtiene un producto por ID |
| `npm run start POST products <title> <price> <category>` | Crea un nuevo producto |
| `npm run start DELETE products/<id>` | Elimina un producto por ID |

## ⚠️ Notas Importantes

1. **API de FakeStore**: Este proyecto consume la API pública de FakeStore (https://fakestoreapi.com)
2. **Operaciones Simuladas**: Las operaciones POST y DELETE son simuladas por la API y no persisten datos realmente
3. **Conexión a Internet**: Se requiere conexión a internet para que el programa funcione
4. **ES Modules**: El proyecto usa `import/export` en lugar de `require/module.exports`

## 🧪 Ejemplos de Prueba

```bash
# Listar todos los productos
npm run start GET products

# Ver producto específico
npm run start GET products/1
npm run start GET products/15
npm run start GET products/20

# Crear productos
npm run start POST products "Laptop Gaming" 1500 electronics
npm run start POST products "Zapatillas Nike" 120 shoes
npm run start POST products "Remera Adidas" 45 clothing

# Eliminar productos
npm run start DELETE products/1
npm run start DELETE products/10
```

## 🐛 Manejo de Errores

El programa incluye validación y manejo de errores para:

- ✅ Comandos inválidos o incompletos
- ✅ Productos no encontrados (404)
- ✅ Errores de conexión a la API
- ✅ Parámetros faltantes o incorrectos

## 📝 Licencia

ISC

---

**Desarrollado con ❤️ usando Node.js y la API de FakeStore**

## 🎓 Proyecto Académico

Este proyecto fue desarrollado como parte de la Pre-Entrega del curso de Node.js, cumpliendo con todos los requerimientos especificados:

- ✅ Configuración inicial con npm y ES Modules
- ✅ Uso de process.argv para capturar comandos
- ✅ Implementación de fetch para peticiones HTTP
- ✅ Aplicación de destructuring y spread operator
- ✅ Uso de métodos de arrays y strings
- ✅ Integración completa con FakeStore API