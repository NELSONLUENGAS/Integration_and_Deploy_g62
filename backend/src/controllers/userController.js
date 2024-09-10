const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');  // La conexión a la base de datos

// Registro de usuario
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Verificar si el usuario ya existe
        const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario en la base de datos
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser.rows[0] });
    } catch (error) {
        next(error);
    }
};

// Inicio de sesión de usuario
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Crear token JWT
        const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };