const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento con Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/uploads/'); // Guardará los archivos en "server/uploads"
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombra el archivo con timestamp
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
