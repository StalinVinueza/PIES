const multer = require('multer');
const path = require('path');

// Configurar el almacenamiento de los archivos con 'multer'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Establece la carpeta de destino para los archivos subidos
    cb(null, 'uploads/'); // Aquí debes crear la carpeta 'uploads' en tu raíz
  },
  filename: function (req, file, cb) {
    // Define el nombre del archivo con una marca de tiempo para hacerlo único
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Limitar los tipos de archivos permitidos (por ejemplo, solo imágenes)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return cb(new Error('Solo se permiten archivos de imagen'), false);
  }
  cb(null, true);
};

// Crear el objeto de carga con la configuración
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limitar el tamaño de los archivos (5MB máximo)
});

module.exports = upload;
