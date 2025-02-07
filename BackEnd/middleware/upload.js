const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Asegurar que la carpeta uploads exista
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✔️ Ahora la carpeta será "Backend/uploads"
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

// Middleware de multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
  fileFilter
});

module.exports = upload;
