const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    ability_score: {
        type: Number
    },
    willingness_score: {
        type: Number
    },
    report: {
        type: String
    }
}, {
    timestamps: true
})

const Users = mongoose.model('Users', userSchema);
module.exports = Users;