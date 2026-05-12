import express from 'express';
import * as productsController from '../controllers/products.controller.js';

const router = express.Router();

// GET /api/products - Obtener todos los productos
router.get('/', productsController.getAllProducts);

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', productsController.getProductById);

// POST /api/products - Crear un nuevo producto
router.post('/', productsController.createProduct);

// PUT /api/products/:id - Actualizar completamente un producto
router.put('/:id', productsController.updateProduct);

// PATCH /api/products/:id - Actualizar parcialmente un producto
router.patch('/:id', productsController.partialUpdateProduct);

// DELETE /api/products/:id - Eliminar un producto
router.delete('/:id', productsController.deleteProduct);

export default router;

// Made with Bob
