require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Directorio público
// Lo último --> para publicar online
app.use(express.static('public'));

// Rutas
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/jueces', require('./routes/jueces.route'));
app.use('/api/competiciones', require('./routes/competiciones.route'));
app.use('/api/asistencias', require('./routes/asistencias.route'));

// Lo último --> para publicar online
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});