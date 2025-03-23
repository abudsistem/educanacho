const Coment = require('../models/comentModel');
const User = require('../models/userModel');

const putFindAndUpdateComent = async (req,res) => {
    try {
        const { content } = req.body;
        const commentId = req.params.id;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        // Verifica que el comentario pertenezca al usuario que lo está editando
        const updatedComent = await Coment.findOneAndUpdate(
            { _id: commentId, user: req.user.id },
            { content: content },
            { new: true } // Devuelve el documento actualizado
        );

        if (!updatedComent) {
            return res.status(404).json({ message: 'Comment not found or unauthorized' });
        }

        res.status(200).json({
            message: 'Comment updated successfully',
            coment: {
                id: updatedComent._id,
                content: updatedComent.content,
                createdAt: updatedComent.createdAt,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error: error.message });
    }
}
module.exports = {
    putFindAndUpdateComent
}