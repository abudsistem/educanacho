const express = require('express');
const { createComent } = require('../controllers/comentController');
const verifyToken = require('../middlewares/authMiddleware');
const {getAllComents} = require('../controllers/allComentsController');
const {getAllUserComents} = require('../controllers/allComentsUserController');
const {putFindAndUpdateComent} = require('../controllers/findAndUpdateComentController')
const router = express.Router();

// Ruta para crear un tweet (protegida con verifyToken)
router.post('/create', verifyToken, createComent);

router.get('/all',getAllComents);

router.get('/usercoments',verifyToken,getAllUserComents);

router.put('/edit/:id', verifyToken, putFindAndUpdateComent);

module.exports = router;