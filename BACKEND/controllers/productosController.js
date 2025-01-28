const pool = require("../db");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener productos");
  }
};

const crearProductoConImagen = async (req, res) => {
  const { nombre, descripcion, imagen } = req.body; // Capturar datos enviados desde el frontend
  const fileImagen = req.file ? `/uploads/${req.file.filename}` : null; // Si hay un archivo, úsalo
  const imagenFinal = imagen || fileImagen; // Priorizar la URL enviada desde el frontend

  try {
    const result = await pool.query(
      "INSERT INTO productos (nombre, descripcion, imagen) VALUES ($1, $2, $3) RETURNING *",
      [nombre, descripcion, imagenFinal]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear el producto");
  }
};

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM productos WHERE id = $1", [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener el producto");
  }
};

// Crear un producto
const crearProducto = async (req, res) => {
  const { nombre, descripcion, imagen } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO productos (nombre, descripcion, imagen) VALUES ($1, $2, $3) RETURNING *",
      [nombre, descripcion, imagen]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear el producto");
  }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen } = req.body;
  try {
    const result = await pool.query(
      "UPDATE productos SET nombre = $1, descripcion = $2, imagen = $3 WHERE id = $4 RETURNING *",
      [nombre, descripcion, imagen, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar el producto");
  }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM productos WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar el producto");
  }
};

module.exports = {
  ...require("./productosController"),
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  crearProductoConImagen,
};
