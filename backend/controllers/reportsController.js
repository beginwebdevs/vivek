const Reports = require('../models/ReportsModel');

class ReportControllers {
    async create(req, res) {
        const {report_type, min_score, max_score, heading, description} = req.body;

        if(!report_type || !min_score || !max_score || !heading || !description){
            return res.status(400).json({success:false, message: "Every fields is required"})
        }

        const report = await Reports.create(req.body);
        res.json({success: true, report});
    }

    async getAbilityScore (req, res) {

        const {score} = req.query;
        const report = await Reports.findOne({report_type: 'rat_ability', min_score: {$lt: score}, max_score: {$gt: score}});
        res.json({report, score})

    }

    async getWillingnessScore (req, res) {

        const {score} = req.query;
        const report = await Reports.findOne({ report_type: 'rat_willingness', min_score: {$lt: score}, max_score: {$gt: score}});
        res.json({report, score})

    }
}

module.exports = new ReportControllers;