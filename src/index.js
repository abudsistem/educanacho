const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const comentRoutes = require('./routes/comentRoutes');
const path = require('path');
const compression = require('compression')

dbConnect();

const app = express();
app.use(compression())

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta `dist` (que está en la carpeta `backend`)
app.use(express.static(path.join(__dirname, '../dist')));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/coments', comentRoutes);

// Cualquier otra ruta servirá el `index.html` del frontend (React)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
