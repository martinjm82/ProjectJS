import * as productsData from '../data/products.js';

// Validar datos del producto
const validateProduct = (product, isPartial = false) => {
  const errors = [];

  if (!isPartial || product.title !== undefined) {
    if (!product.title || typeof product.title !== 'string' || product.title.trim() === '') {
      errors.push('El título es requerido y debe ser un texto válido');
    }
  }

  if (!isPartial || product.price !== undefined) {
    if (product.price === undefined || typeof product.price !== 'number' || product.price <= 0) {
      errors.push('El precio es requerido y debe ser un número mayor a 0');
    }
  }

  if (!isPartial || product.description !== undefined) {
    if (!product.description || typeof product.description !== 'string') {
      errors.push('La descripción es requerida y debe ser un texto válido');
    }
  }

  if (!isPartial || product.category !== undefined) {
    if (!product.category || typeof product.category !== 'string') {
      errors.push('La categoría es requerida y debe ser un texto válido');
    }
  }

  return errors;
};

// GET /api/products - Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await productsData.getProducts();
    const filteredProducts = productsData.filterDeletedProducts(products);
    res.status(200).json({
      success: true,
      count: filteredProducts.length,
      data: filteredProducts,
      source: 'FakeStore API'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los productos',
      details: error.message
    });
  }
};

// GET /api/products/:id - Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await productsData.getProductById(req.params.id);
    
    if (!product || product._deleted) {
      return res.status(404).json({
        success: false,
        error: `Producto con ID ${req.params.id} no encontrado`
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener el producto',
      details: error.message
    });
  }
};

// POST /api/products - Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;

    // Validar datos
    const errors = validateProduct(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Datos inválidos',
        details: errors
      });
    }

    const newProduct = await productsData.createProduct({
      title,
      price,
      description,
      category,
      image: image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
    });

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente (almacenado localmente)',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear el producto',
      details: error.message
    });
  }
};

// PUT /api/products/:id - Actualizar completamente un producto
export const updateProduct = async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;

    // Validar datos
    const errors = validateProduct(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Datos inválidos',
        details: errors
      });
    }

    const updatedProduct = await productsData.updateProduct(req.params.id, {
      title,
      price,
      description,
      category,
      image: image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: `Producto con ID ${req.params.id} no encontrado`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente (cambios locales)',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el producto',
      details: error.message
    });
  }
};

// PATCH /api/products/:id - Actualizar parcialmente un producto
export const partialUpdateProduct = async (req, res) => {
  try {
    // Validar que al menos un campo esté presente
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Debe proporcionar al menos un campo para actualizar'
      });
    }

    // Validar solo los campos proporcionados
    const errors = validateProduct(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Datos inválidos',
        details: errors
      });
    }

    const updatedProduct = await productsData.partialUpdateProduct(req.params.id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: `Producto con ID ${req.params.id} no encontrado`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto actualizado parcialmente (cambios locales)',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el producto',
      details: error.message
    });
  }
};

// DELETE /api/products/:id - Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await productsData.deleteProduct(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: `Producto con ID ${req.params.id} no encontrado`
      });
    }

    res.status(200).json({
      success: true,
      message: `Producto con ID ${req.params.id} eliminado exitosamente (marcado como eliminado localmente)`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el producto',
      details: error.message
    });
  }
};

// Made with Bob
