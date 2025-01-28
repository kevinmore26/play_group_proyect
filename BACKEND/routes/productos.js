const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProductoConImagen,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/productosController');

// Endpoints
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.post('/', upload.single('imagen'), crearProductoConImagen); // Aquí se sube la imagen
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;
