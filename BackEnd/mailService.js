const nodemailer = require('nodemailer');

// Configuración de Nodemailer para enviar el correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu correo electrónico
    pass: process.env.EMAIL_PASS, // Tu contraseña o la contraseña de la aplicación
  },
});

// Función para enviar un correo electrónico
const enviarCorreo = (nombre, email, celular, mensaje) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // El correo a donde se enviará el mensaje
    subject: `Nuevo mensaje de ${nombre}`,
    text: `
      Nombre: ${nombre}
      Correo: ${email}
      Celular: ${celular}
      Mensaje: ${mensaje}
    `,
  };

  // Enviar el correo
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error); // Rechazamos la promesa si ocurre un error
      } else {
        resolve(info); // Resolvemos la promesa con la información del correo enviado
      }
    });
  });
};

module.exports = { enviarCorreo };
