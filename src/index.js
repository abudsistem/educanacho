/*
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const comentRoutes = require('./routes/comentRoutes');

dbConnect();

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/coments', comentRoutes);

const PORT = process.env.PORT || 3001; // Línea corregida

app.listen(PORT, () => {
    console.log(`PORT: ${PORT}`);
    console.log(`JSON_WEB_TOKEN_SECRET: ${process.env.JSON_WEB_TOKEN_SECRET}`);
    console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
    console.log('Server is running');
});

*/

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

//Servir archivos estáticos desde la carpeta `dist` (que está en la carpeta `backend`)
app.use(express.static(path.join(__dirname, '../dist')));

//Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/coments', comentRoutes);

//Cualquier otra ruta servirá el `index.html` del frontend (React)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});


/*
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const comentRoutes = require('./routes/comentRoutes');
const path = require('path');
const compression = require('compression');

dbConnect();

const app = express();
app.use(compression());

// Configurar CORS con credenciales
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Servir archivos estáticos desde `dist`
app.use(express.static(path.join(__dirname, '../dist'), {
    etag: true,  // Habilita ETags para optimización de caché
    lastModified: true
}));

// Middleware para configurar `Cache-Control` y compatibilidad con bfcache
app.use((req, res, next) => {
    if (req.method === 'GET' && req.headers.accept &&req.headers.accept.includes('text/html')) {
        res.set('Cache-Control', 'public, max-age=3600, must-revalidate'); // Permite bfcache
    }
    next();
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/coments', comentRoutes);

// Redirección de todas las rutas al frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto: ${PORT}`);
});

*/