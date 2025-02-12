const ProductoModel = require('../model/productoM');

// Obtener todos los productos
const getAllProductos = async (req, res) => {
  try {
    const productos = await ProductoModel.getAllProductos();
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los productos: ' + err.message });
  }
};

// Obtener un producto por ID
const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await ProductoModel.getProductoById(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el producto: ' + err.message });
  }
};

// Obtener productos por ES_EMP_ID (ID del emprendimiento)
const getProductosByEmprendimientoId = async (req, res) => {
  const { es_emp_id } = req.params;
  try {
    const productos = await ProductoModel.getProductosByEmprendimientoId(es_emp_id);
    if (productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos para este emprendimiento.' });
    }
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los productos: ' + err.message });
  }
};

// Crear un nuevo producto con imagen
const createProducto = async (req, res) => {
  try {
    const { es_emp_id, es_pro_nombre, es_pro_precio, es_pro_stock, es_pro_descripcion } = req.body;
    const es_pro_imagen = req.file ? `/uploads/${req.file.filename}` : null;

    // Validación básica
    if (!es_emp_id || !es_pro_nombre || !es_pro_precio || !es_pro_stock || !es_pro_descripcion) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const newProducto = await ProductoModel.createProducto({
      es_emp_id,
      nombre: es_pro_nombre,
      precio: es_pro_precio,
      stock: es_pro_stock,
      descripcion: es_pro_descripcion,
      imagen: es_pro_imagen
    });

    res.status(201).json(newProducto);
  } catch (err) {
    console.error("Error al crear el producto:", err);
    res.status(500).json({ message: "Error interno del servidor al crear el producto." });
  }
};

// Actualizar un producto con imagen
const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { es_emp_id, es_pro_nombre, es_pro_precio, es_pro_stock, es_pro_descripcion } = req.body;
  const es_pro_imagen = req.file ? `/uploads/${req.file.filename}` : req.body.es_pro_imagen;

  if (!id || !es_emp_id || !es_pro_nombre || !es_pro_precio || !es_pro_stock || !es_pro_descripcion) {
    return res.status(400).json({ message: 'Faltan datos para actualizar el producto' });
  }

  try {
    const updatedProducto = await ProductoModel.updateProducto(id, {
      es_emp_id,
      nombre: es_pro_nombre,
      precio: es_pro_precio,
      stock: es_pro_stock,
      descripcion: es_pro_descripcion,
      imagen: es_pro_imagen
    });

    if (!updatedProducto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(updatedProducto);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el producto: ' + err.message });
  }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ProductoModel.deleteProducto(id);
    if (!result) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar el producto: " + err.message });
  }
};

module.exports = {
  getAllProductos,
  getProductoById,
  getProductosByEmprendimientoId, // Exportar el nuevo método
  createProducto,
  updateProducto,
  deleteProducto
};