const express = require('express');
const router = express.Router();
const { createPost, getPosts } = require('../controllers/postController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Rutas de posts
router.post('/', authMiddleware, createPost); // Crear un post (requiere autenticación)
router.get('/', authMiddleware, getPosts);    // Obtener todos los posts (requiere autenticación)

module.exports = router;