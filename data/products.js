import axios from 'axios';

const FAKESTORE_API = 'https://fakestoreapi.com/products';

// Cache local para almacenar productos modificados/creados
let localProducts = [];
let productsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Obtener productos de FakeStore API con cache
async function fetchProductsFromAPI() {
  const now = Date.now();
  
  // Si hay cache válido, usarlo
  if (productsCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return productsCache;
  }

  try {
    const response = await axios.get(FAKESTORE_API);
    productsCache = response.data;
    cacheTimestamp = now;
    return productsCache;
  } catch (error) {
    console.error('Error al obtener productos de FakeStore API:', error.message);
    // Si falla, devolver cache antiguo o array vacío
    return productsCache || [];
  }
}

// Combinar productos de API con productos locales
function mergeProducts(apiProducts) {
  const merged = [...apiProducts];
  
  // Agregar productos locales que no existen en la API
  localProducts.forEach(localProduct => {
    const index = merged.findIndex(p => p.id === localProduct.id);
    if (index === -1) {
      // Producto nuevo creado localmente
      merged.push(localProduct);
    } else {
      // Producto modificado localmente
      merged[index] = localProduct;
    }
  });
  
  return merged;
}

export const getProducts = async () => {
  const apiProducts = await fetchProductsFromAPI();
  return mergeProducts(apiProducts);
};

export const getProductById = async (id) => {
  const products = await getProducts();
  return products.find(p => p.id === parseInt(id));
};

export const createProduct = async (productData) => {
  const products = await getProducts();
  
  // Generar nuevo ID (mayor que todos los existentes)
  const maxId = Math.max(...products.map(p => p.id), 0);
  const newProduct = {
    id: maxId + 1,
    ...productData
  };
  
  localProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id, productData) => {
  const products = await getProducts();
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) return null;
  
  const updatedProduct = {
    id: parseInt(id),
    ...productData
  };
  
  // Actualizar o agregar en productos locales
  const localIndex = localProducts.findIndex(p => p.id === parseInt(id));
  if (localIndex === -1) {
    localProducts.push(updatedProduct);
  } else {
    localProducts[localIndex] = updatedProduct;
  }
  
  return updatedProduct;
};

export const partialUpdateProduct = async (id, productData) => {
  const products = await getProducts();
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) return null;
  
  const updatedProduct = {
    ...product,
    ...productData,
    id: parseInt(id)
  };
  
  // Actualizar o agregar en productos locales
  const localIndex = localProducts.findIndex(p => p.id === parseInt(id));
  if (localIndex === -1) {
    localProducts.push(updatedProduct);
  } else {
    localProducts[localIndex] = updatedProduct;
  }
  
  return updatedProduct;
};

export const deleteProduct = async (id) => {
  const products = await getProducts();
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) return false;
  
  // Marcar como eliminado agregando a productos locales con flag
  localProducts.push({ id: parseInt(id), _deleted: true });
  return true;
};

// Filtrar productos eliminados
export const filterDeletedProducts = (products) => {
  const deletedIds = localProducts
    .filter(p => p._deleted)
    .map(p => p.id);
  
  return products.filter(p => !deletedIds.includes(p.id));
};

// Limpiar cache (útil para testing)
export const clearCache = () => {
  productsCache = null;
  cacheTimestamp = null;
  localProducts = [];
};

// Made with Bob
