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
export const getAllProducts = (req, res) => {
  try {
    const products = productsData.getProducts();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los productos'
    });
  }
};

// GET /api/products/:id - Obtener un producto por ID
export const getProductById = (req, res) => {
  try {
    const product = productsData.getProductById(req.params.id);
    
    if (!product) {
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
      error: 'Error al obtener el producto'
    });
  }
};

// POST /api/products - Crear un nuevo producto
export const createProduct = (req, res) => {
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

    const newProduct = productsData.createProduct({
      title,
      price,
      description,
      category,
      image: image || 'https://via.placeholder.com/300x300?text=Product'
    });

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear el producto'
    });
  }
};

// PUT /api/products/:id - Actualizar completamente un producto
export const updateProduct = (req, res) => {
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

    const updatedProduct = productsData.updateProduct(req.params.id, {
      title,
      price,
      description,
      category,
      image: image || 'https://via.placeholder.com/300x300?text=Product'
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: `Producto con ID ${req.params.id} no encontrado`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el producto'
    });
  }
};

// PATCH /api/products/:id - Actualizar parcialmente un producto
export const partialUpdateProduct = (req, res) => {
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

    const updatedProduct = productsData.partialUpdateProduct(req.params.id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: `Producto con ID ${req.params.id} no encontrado`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto actualizado parcialmente',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el producto'
    });
  }
};

// DELETE /api/products/:id - Eliminar un producto
export const deleteProduct = (req, res) => {
  try {
    const deleted = productsData.deleteProduct(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: `Producto con ID ${req.params.id} no encontrado`
      });
    }

    res.status(200).json({
      success: true,
      message: `Producto con ID ${req.params.id} eliminado exitosamente`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el producto'
    });
  }
};

// Made with Bob
