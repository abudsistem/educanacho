const express = require('express');
const { createComent, getAllComents, getAllUserComents, putFindAndUpdateComent, deleteComent } = require('../controllers/comentController'); // Usa un solo archivo para los controladores
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const router = express.Router();

// Ruta para crear un comentario (protegida con verifyToken y authorizeRoles)
router.post('/coments', verifyToken, authorizeRoles("manager", "admin"), createComent);

// Ruta para obtener todos los comentarios
router.get('/coments', getAllComents);

// Ruta para obtener los comentarios del usuario (protegida con verifyToken)
router.get('/coments/user', verifyToken, getAllUserComents);

// Ruta para actualizar un comentario (protegida con verifyToken y authorizeRoles)
router.put('/coments/:id', verifyToken, authorizeRoles("manager", "admin"), putFindAndUpdateComent);

// Ruta para eliminar un comentario (protegida con verifyToken y authorizeRoles)
router.delete('/coments/:id', verifyToken, authorizeRoles("manager", "admin"), deleteComent);

module.exports = router;

