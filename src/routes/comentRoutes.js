const express = require('express');
const { createComent } = require('../controllers/comentController');
const verifyToken = require('../middlewares/authMiddleware');
const {getAllComents} = require('../controllers/allComentsController');
const {getAllUserComents} = require('../controllers/allComentsUserController');
const {putFindAndUpdateComent} = require('../controllers/findAndUpdateComentController')
const {deleteComent} = require('../controllers/deleteComentController')
const router = express.Router();

const authorizeRoles = require('../middlewares/roleMiddleware');
// Ruta para crear un tweet (protegida con verifyToken)
router.post('/create', verifyToken,authorizeRoles("manager","admin"), createComent);

router.get('/all',getAllComents);

router.get('/usercoments',verifyToken,getAllUserComents);

router.put('/edit/:id', verifyToken, putFindAndUpdateComent);

router.delete('/delete/:id', verifyToken, deleteComent);

module.exports = router;