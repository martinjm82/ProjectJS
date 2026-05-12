// Importar módulo para hacer peticiones HTTP
import fetch from 'node-fetch';

// URL base de la API de FakeStore
const API_URL = 'https://fakestoreapi.com/products';

// Capturar argumentos de la línea de comandos
const [, , method, resource, ...params] = process.argv;

// Función principal que maneja los comandos
async function main() {
  try {
    // Validar que se proporcionaron argumentos
    if (!method || !resource) {
      console.log('❌ Error: Debes proporcionar un método y un recurso');
      console.log('\nUso:');
      console.log('  npm run start GET products');
      console.log('  npm run start GET products/<id>');
      console.log('  npm run start POST products <title> <price> <category>');
      console.log('  npm run start DELETE products/<id>');
      return;
    }

    // Procesar el comando según el método HTTP
    switch (method.toUpperCase()) {
      case 'GET':
        await handleGet(resource);
        break;
      
      case 'POST':
        await handlePost(resource, params);
        break;
      
      case 'DELETE':
        await handleDelete(resource);
        break;
      
      default:
        console.log(`❌ Método "${method}" no soportado`);
        console.log('Métodos disponibles: GET, POST, DELETE');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Manejar peticiones GET
async function handleGet(resource) {
  // Separar el recurso y el ID si existe
  const parts = resource.split('/');
  const [resourceName, productId] = parts;

  if (resourceName !== 'products') {
    console.log('❌ Recurso no válido. Usa "products"');
    return;
  }

  if (productId) {
    // GET products/<id> - Obtener un producto específico
    console.log(`\n🔍 Consultando producto con ID: ${productId}...\n`);
    
    const response = await fetch(`${API_URL}/${productId}`);
    
    if (!response.ok) {
      console.log(`❌ Producto con ID ${productId} no encontrado`);
      return;
    }
    
    const product = await response.json();
    
    console.log('✅ Producto encontrado:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`ID:          ${product.id}`);
    console.log(`Título:      ${product.title}`);
    console.log(`Precio:      $${product.price}`);
    console.log(`Categoría:   ${product.category}`);
    console.log(`Descripción: ${product.description}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } else {
    // GET products - Obtener todos los productos
    console.log('\n📦 Consultando todos los productos...\n');
    
    const response = await fetch(API_URL);
    const products = await response.json();
    
    console.log(`✅ Se encontraron ${products.length} productos:\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    products.forEach(product => {
      console.log(`ID: ${product.id} | ${product.title} - $${product.price}`);
    });
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }
}

// Manejar peticiones POST
async function handlePost(resource, params) {
  if (resource !== 'products') {
    console.log('❌ Recurso no válido. Usa "products"');
    return;
  }

  // Destructuring de los parámetros
  const [title, price, category] = params;

  // Validar que se proporcionaron todos los parámetros
  if (!title || !price || !category) {
    console.log('❌ Error: Debes proporcionar title, price y category');
    console.log('Ejemplo: npm run start POST products "T-Shirt-Rex" 300 remeras');
    return;
  }

  console.log('\n➕ Creando nuevo producto...\n');

  // Crear objeto del nuevo producto
  const newProduct = {
    title,
    price: parseFloat(price),
    category,
    description: `Producto ${title} en categoría ${category}`,
    image: 'https://fakestoreapi.com/img/placeholder.jpg'
  };

  // Enviar petición POST a la API
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
  });

  const result = await response.json();

  console.log('✅ Producto creado exitosamente:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`ID:        ${result.id}`);
  console.log(`Título:    ${result.title}`);
  console.log(`Precio:    $${result.price}`);
  console.log(`Categoría: ${result.category}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Manejar peticiones DELETE
async function handleDelete(resource) {
  // Separar el recurso y el ID
  const parts = resource.split('/');
  const [resourceName, productId] = parts;

  if (resourceName !== 'products') {
    console.log('❌ Recurso no válido. Usa "products"');
    return;
  }

  if (!productId) {
    console.log('❌ Error: Debes proporcionar un ID de producto');
    console.log('Ejemplo: npm run start DELETE products/7');
    return;
  }

  console.log(`\n🗑️  Eliminando producto con ID: ${productId}...\n`);

  // Enviar petición DELETE a la API
  const response = await fetch(`${API_URL}/${productId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    console.log(`❌ No se pudo eliminar el producto con ID ${productId}`);
    return;
  }

  const result = await response.json();

  console.log('✅ Producto eliminado exitosamente:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`ID eliminado: ${productId}`);
  console.log('Respuesta de la API:', JSON.stringify(result, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Ejecutar el programa
main();

// Made with Bob
