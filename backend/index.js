require('dotenv').config();
const app = require('./src/app');
const { setupDatabase } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
const startServer = async () => {
    try {
        // Realizar el setup de la base de datos
        await setupDatabase();

        // Iniciar el servidor en el puerto definido
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer();