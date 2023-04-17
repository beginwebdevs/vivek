const mongoose = require('mongoose');
const {Schema} = mongoose;

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

const Tokens = mongoose.model('Tokens', tokenSchema);
module.exports = Tokens;