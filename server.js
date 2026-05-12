import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.routes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Productos',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      documentation: 'Ver README.md para más información'
    }
  });
});

// Rutas de la API
app.use('/api/products', productsRoutes);

// Middleware de manejo de errores
app.use(notFound);
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Servidor REST API iniciado exitosamente             ║
║                                                           ║
║   📡 Puerto: ${PORT}                                        ║
║   🌐 URL: http://localhost:${PORT}                         ║
║   📚 API: http://localhost:${PORT}/api/products            ║
║                                                           ║
║   Presiona Ctrl+C para detener el servidor               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;

// Made with Bob
