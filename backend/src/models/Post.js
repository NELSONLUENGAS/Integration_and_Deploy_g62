const { pool } = require('../config/db'); // La conexión a la base de datos

// Crear un nuevo post
const createPost = async (title, content, userId) => {
  const result = await pool.query(`
        INSERT INTO posts (title, content, user_id)
        VALUES ($1, $2, $3) RETURNING *;
    `, [title, content, userId]);

  return result.rows[0];
};

// Obtener todos los posts con el usuario asociado
const getPosts = async () => {
  const result = await pool.query(`
        SELECT posts.*, users.name as user_name, users.email as user_email
        FROM posts
        JOIN users ON posts.user_id = users.id;
    `);

  return result.rows;
};

module.exports = { createPost, getPosts };