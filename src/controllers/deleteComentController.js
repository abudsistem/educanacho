const Coment = require('../models/comentModel');

const deleteComent = async (req, res) => {
    try {
        const commentId = req.params.id;

        // Verifica que el comentario pertenezca al usuario que lo está eliminando
        const deletedComent = await Coment.findOneAndDelete({
            _id: commentId,
            user: req.user.id,
        });

        if (!deletedComent) {
            return res.status(404).json({ message: 'Comment not found or unauthorized' });
        }

        res.status(200).json({
            message: 'Comment deleted successfully',
            coment: {
                id: deletedComent._id,
                content: deletedComent.content,
                createdAt: deletedComent.createdAt,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
};

module.exports = {
    deleteComent,
};