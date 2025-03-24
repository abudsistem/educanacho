const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
//coments
const comentRoutes = require('./routes/comentRoutes');

dbConnect();

const app = express();

//Middleware CORS
app.use(cors( /*{
    origin: 'http://localhost:5173', // Dirección del frontend (Vite)
    credentials: true, // Permitir cookies o encabezados de autorización
}*/));

app.use(express.static('dist'))

//middleware
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/coments', comentRoutes);
//Server
const PORT = 'https://educanacho.onrender.com/';
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

