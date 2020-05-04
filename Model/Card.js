const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('TestCard', cardSchema);