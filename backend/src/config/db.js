const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Setup inicial: crear tablas y datos
const setupDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id)
      );
    `);

    // Insertar datos iniciales
    const hashedPassword = await bcrypt.hash('password123', 10);

    await pool.query(`
      INSERT INTO users (name, email, password) VALUES
      ('Admin', 'admin@example.com', $1)
      ON CONFLICT DO NOTHING;
    `, [hashedPassword]);

    await pool.query(`
      INSERT INTO posts (title, content, user_id) VALUES
      ('Primer post', 'Este es el primer post creado automáticamente', 1)
      ON CONFLICT DO NOTHING;
    `);

    console.log('Setup de base de datos completado');
  } catch (error) {
    console.error('Error en el setup de la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = { pool, setupDatabase };