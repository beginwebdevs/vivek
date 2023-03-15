const Questions = require('../models/QuestionModel');


class QuestionController {

    //creating question
    async createQuestion (req, res) {
        const {question, q_type} = req.body;
        if(!question){
            return res.status(400).json({success: false, message: 'Question is required!'});
        }
        if(!q_type){
            return res.status(400).json({success: false, message: 'Question type is required!'});
        }

        const question_res = await Questions.create(req.body);
        res.json({success: true, que: question_res});
    }


    //get all question
    async getQuestions  (req, res) {
       const questions = await Questions.find()
       res.json(questions);
    }

    async getQuestionById (req, res) {
        const question = await Questions.findOne({_id: req.params.id})
       res.json(question);
        
    }

    //delete question
    async deleteQuestion (req, res) {
        const resp = await Questions.findOneAndDelete({_id: req.params.id});
        res.json(resp)
    }

    async updateQuestion (req, res) {
        const upd = await Questions.findByIdAndUpdate(req.params.id, req.body);
        res.json(upd)
    }
}

module.exports = new QuestionController();