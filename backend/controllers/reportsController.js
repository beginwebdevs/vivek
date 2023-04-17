const Reports = require('../models/ReportsModel');

class ReportControllers {
    async create(req, res) {
        const {min_score, max_score, contents} = req.body;
        

        // if(!min_score || !max_score || !contents){
        //     return res.status(400).json({success:false, message: "Every fields is required"})
        // }

        const report = await Reports.create(req.body);
        res.json({success: true, report});
    }

    async getAbilityScore (req, res) {

        const {score} = req.query;
        const report = await Reports.findOne({report_type: 'rat_ability', min_score: {$lt: score}, max_score: {$gt: score}});
        res.json({report, score})

    }

    async getReport (req, res) {

        const {score} = req.query;
        const report = await Reports.findOne({min_score: {$lt: (+score)}, max_score: {$gt: (+score)}});
        res.json({report, score})

    }

    

    async getRp(req, res) {
       
        const reports = await Reports.find()
        res.json(reports)
    }

    async getById (req, res) {
        console.log(req.query.id)
        const report = await Reports.findOne({_id: req.query.id});
        res.json(report)
    }

    async update (req, res) {
        const report = await Reports.findOneAndUpdate({_id: req.body._id}, req.body, {returnDocument: 'after'});
        res.json(report);
    }

    async delete (req, res) {
        const resp = await Reports.findOneAndDelete({_id: req.params.id});
        res.json(resp)
    }
}

module.exports = new ReportControllers;