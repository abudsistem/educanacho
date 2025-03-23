// filepath: /home/edgarborja/cristinavitefinal/backend/src/controllers/userController.js
const User = require('../models/userModel');
const Coment = require('../models/comentModel');

const saveComent = async (req, res) => {
    try {
        const { comentId } = req.body;

        // Verificar que el comentario existe
        const coment = await Coment.findById(comentId);
        if (!coment) {
            return res.status(404).json({ message: 'Coment not found' });
        }

        // Obtener el usuario autenticado
        const user = await User.findById(req.user.id);

        // Verificar si el comentario ya está guardado
        if (user.savedComents.includes(comentId)) {
            return res.status(400).json({ message: 'Coment already saved' });
        }

        // Guardar el comentario en la cuenta del usuario
        user.savedComents.push(comentId);
        await user.save();

        res.status(200).json({
            message: 'Coment saved successfully',
            savedComents: user.savedComents,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error saving coment', error: error.message });
    }
};

module.exports = {
    saveComent, // Exportar correctamente la función
};