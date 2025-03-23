const Coment = require('../models/comentModel');

const getAllUserComents = async (req, res) => {
    try {
        // Recuperar todos los comentarios de la base de datos
        const coments = await Coment.find({user: req.user.id}).populate('user', 'username role'); // Usar populate para incluir datos del usuario

        res.status(200).json({
            message: 'Coments retrieved successfully',
            coments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving coments', error: error.message });
    }
};  

module.exports = {
    getAllUserComents, // Exportar el nuevo método
};