const mongoose = require('mongoose');
const {Schema} = mongoose;

const reportsSchema = new Schema({
    report_type: {
        type: String,
        required: true
    },
    min_score: {
        type: Number,
        required: true
    },
    max_score: {
        type: Number,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Reports = mongoose.model('Reports', reportsSchema);
module.exports = Reports;


