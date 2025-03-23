const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const { saveComent } = require('../controllers/userController'); 
const router = express.Router();


router.get('/admin',verifyToken,authorizeRoles("admin"), (req, res) => {
    res.json({message:'Welcome Admin'});
})

router.get('/manager',verifyToken,authorizeRoles("manager","admin"), (req, res) => {
    res.json({message:'Welcome manager'});
})

router.get('/user',verifyToken,authorizeRoles("user","manager","admin"), (req, res) => {
    res.json({message:'Welcome user'});
})

router.post('/save-coment', verifyToken, saveComent,(req, res) => {
    res.json({message:'nota guarda'});
})
module.exports = router;