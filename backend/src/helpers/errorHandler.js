// Manejador de errores global
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error en el servidor';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

module.exports = { errorHandler };