// Almacenamiento en memoria de productos
let products = [
  {
    id: 1,
    title: "Laptop HP Pavilion",
    price: 899.99,
    description: "Laptop de alto rendimiento con procesador Intel Core i7",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Mouse Inalámbrico Logitech",
    price: 29.99,
    description: "Mouse ergonómico con conexión Bluetooth",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Teclado Mecánico RGB",
    price: 79.99,
    description: "Teclado mecánico con iluminación RGB personalizable",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Monitor 27 pulgadas 4K",
    price: 399.99,
    description: "Monitor 4K UHD con tecnología IPS",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Auriculares Bluetooth",
    price: 149.99,
    description: "Auriculares con cancelación de ruido activa",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
  }
];

// Contador para generar IDs únicos
let nextId = 6;

export const getProducts = () => products;

export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

export const createProduct = (productData) => {
  const newProduct = {
    id: nextId++,
    ...productData
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id, productData) => {
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) return null;
  
  products[index] = {
    id: parseInt(id),
    ...productData
  };
  return products[index];
};

export const partialUpdateProduct = (id, productData) => {
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...productData,
    id: parseInt(id) // Asegurar que el ID no cambie
  };
  return products[index];
};

export const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) return false;
  
  products.splice(index, 1);
  return true;
};

// Made with Bob
