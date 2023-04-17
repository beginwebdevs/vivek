const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    q_type: {
        type: String,
        required: true
    },
    q_group: {
        type: String,
        required: false
    },
    affect_report:{
        type: Boolean,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    options: [
        {
            option:{
                type: String,
                required: false
            },
            weight: {
                type: Number,
                required: false
            }
        }
    ],
    list_index: {
        type: Number
    },
    why:{
        type: String
    }
})

const Questions = mongoose.model('Questions', questionSchema);
module.exports = Questions;