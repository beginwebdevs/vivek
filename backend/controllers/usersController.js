const Users = require('../models/UsersModel');
const PDFDocument = require('pdfkit');
const fs = require('fs')

class UserController {
    async create (req, res) {
       

        //creating & saving documents
        const fileName = `${Date.now()}.pdf`;
        const pdfDoc = new PDFDocument();
        const reportData = req.body.report;
        pdfDoc.pipe(fs.createWriteStream(fileName))
        reportData.contents.forEach(d => {
            pdfDoc.text(d.heading);
            pdfDoc.text(d.description);
        });
        pdfDoc.end();


        const data = {
            name: req.body.name,
            email: req.body.email,
            ability_score: (+req.body.ability_score),
            willingness_score: (+req.body.willingness_score),
            report: fileName

        }






        const user = await Users.create(data);
        res.json(user)
    }

    async get(req, res) {
        const users = await Users.find();
        res.json(users)
    }

    async delete (req, res) {
        const resp = await Users.findOneAndDelete({_id: req.params.id})
        res.json(resp)
    }
}

module.exports = new UserController;