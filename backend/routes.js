const express = require('express');
const router = express.Router();
const QuestionController = require('./controllers/questionController');
const ReportControllers = require('./controllers/reportsController');
const AdminsController = require('./controllers/adminsController');
const UserController = require('./controllers/usersController')

//question route
router.post('/api/question/create', QuestionController.createQuestion);
router.get('/api/question/get', QuestionController.getQuestions);
router.get('/api/question/:id', QuestionController.getQuestionById);
router.get('/api/question/delete/:id', QuestionController.deleteQuestion)
router.put('/api/question/update/:id', QuestionController.updateQuestion);

//reports route
router.post('/api/report/create', ReportControllers.create);
router.get('/api/report/ability', ReportControllers.getAbilityScore);
router.get('/api/report/get', ReportControllers.getReport);
router.get('/api/report/get', ReportControllers.get);
router.get('/api/reports/id', ReportControllers.getById);
router.post('/api/report/update', ReportControllers.update);
router.delete('/api/report/delete/:id', ReportControllers.delete)


//admins route
router.post('/api/admin/create', AdminsController.create)
router.post('/api/admin/verify', AdminsController.verify)
router.get('/api/admin/auto', AdminsController.auto)


//user route
router.post('/api/user/create', UserController.create);
router.get('/api/user/get', UserController.get);
router.delete('/api/user/delete/:id', UserController.delete);


module.exports = router;