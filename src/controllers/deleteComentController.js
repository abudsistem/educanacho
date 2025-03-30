const Coment = require('../models/comentModel');

const deleteComent = async (req, res) => {
    try {
        const commentId = req.params.id;

        // Validación: Verifica si el ID del comentario está presente
        if (!commentId) {
            return res.status(400).json({ message: 'Comment ID is required' });
        }

        // Validación: Verifica si el ID del usuario está presente
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: User ID missing' });
        }

        // Intenta eliminar el comentario, verificando tanto el ID del comentario como el del usuario
        const deletedComent = await Coment.findOneAndDelete({
            _id: commentId,
            user: req.user.id,
        });

        // Verifica si el comentario fue encontrado y eliminado
        if (!deletedComent) {
            return res.status(404).json({ message: 'Comment not found or unauthorized' });
        }

        // Envía una respuesta exitosa
        res.status(200).json({ message: 'Comment deleted successfully' });

    } catch (error) {
        // Manejo de errores detallado
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
};

module.exports = {
    deleteComent,
};