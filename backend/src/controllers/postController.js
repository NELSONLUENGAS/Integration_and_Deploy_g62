const { pool } = require('../config/db');  // La conexión a la base de datos

// Crear un post
const createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id; // Viene del middleware de autenticación

        const newPost = await pool.query(
            'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, content, userId]
        );

        res.status(201).json({ message: 'Post creado con éxito', post: newPost.rows[0] });
    } catch (error) {
        next(error)
    }
};

// Obtener todos los posts
const getPosts = async (req, res, next) => {
    try {
        const posts = await pool.query('SELECT * FROM posts');
        res.status(200).json(posts.rows);
    } catch (error) {
        next(error);
    }
};

module.exports = { createPost, getPosts };