const productoModel = require('../model/productoM.js'); // Asegúrate de que la ruta sea correcta

// Obtener todos los productos
const getAllProductos = async (req, res) => {
  try {
    const productos = await productoModel.getAllProductos();
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un producto por ID
const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await productoModel.getProductoById(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
  const { nombre, precio, stock, descripcion, imagen } = req.body;
  try {
    const newProducto = await productoModel.createProducto({
      nombre, precio, stock, descripcion, imagen
    });
    res.status(201).json(newProducto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un producto
const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock, descripcion, imagen } = req.body;
  try {
    const updatedProducto = await productoModel.updateProducto(id, {
      nombre, precio, stock, descripcion, imagen
    });
    if (!updatedProducto) {
      return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
    }
    res.status(200).json(updatedProducto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProducto = await productoModel.deleteProducto(id);
    if (!deletedProducto) {
      return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
    }
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
