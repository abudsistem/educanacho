const Coment = require('../models/comentModel');
const User = require('../models/userModel');

const createComent = async (req, res) => {
    try{
        const { content } = req.body;
        
        if(!content){
            return res.status(400).json({message: 'Content is required'});
        }

        const coment = new Coment({
            user: req.user.id,
            content,
        })

        await coment.save();
 
        const user = await User.findById(req.user.id).select('username');
        res.status(201).json({
            
            message: 'Coment created successfully',
            coment: {
                id: coment._id,
                content: coment.content,
                createdAt: coment.createdAt,
                username: user.username, // Incluir el username
            }

        });
    }catch(error){
        res.status(500).json({message: 'Coment not created successfully', error: error.message});
    }
};

const getAllComents = async (req, res) => {
  try {
    // Recuperar todos los comentarios de la base de datos
    const coments = await Coment.find().populate('user', 'username role'); // Usar populate para incluir datos del usuario

    res.status(200).json({
      message: 'Coments retrieved successfully',
      coments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving coments', error: error.message });
  }
};

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
    createComent,
    getAllComents,
    getAllUserComents,
    putFindAndUpdateComent,
    deleteComent
};

