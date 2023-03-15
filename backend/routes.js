const express = require('express');
const router = express.Router();
const QuestionController = require('./controllers/questionController');
const ReportControllers = require('./controllers/reportsController');

//question route
router.post('/api/question/create', QuestionController.createQuestion);
router.get('/api/question/get', QuestionController.getQuestions);
router.get('/api/question/:id', QuestionController.getQuestionById);
router.get('/api/question/delete/:id', QuestionController.deleteQuestion)
router.put('/api/question/update/:id', QuestionController.updateQuestion);

//reports route
router.post('/api/report/create', ReportControllers.create);
router.get('/api/report/ability', ReportControllers.getAbilityScore);
router.get('/api/report/willingness', ReportControllers.getWillingnessScore);

module.exports = router;