const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./helpers/errorHandler');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Inicializa la app de Express
const app = express();

// Middlewares
app.use(cors({
    origin: process.env.STATIC_SITE
}));
app.use(express.json());
app.use(morgan('dev'));  // Log de las solicitudes HTTP

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Manejador de errores
app.use(errorHandler);

module.exports = app;