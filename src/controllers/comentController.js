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
 
        const user = await User.findById(req.user._id).select('username');
        res.status(201).json({
            
            message: 'Coment created successfully',
            coment: {
                id: coment._id,
                content: coment.content,
                createdAt: coment.createdAt,
            }

        });
    }catch(error){
        res.status(500).json({message: 'Coment not created successfully', error: error.message});
    }
};

module.exports = {
    createComent,
};