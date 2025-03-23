const mongoose = require('mongoose');

const comentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 200,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Coment', comentSchema);