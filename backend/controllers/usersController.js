const Users = require('../models/UsersModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer')
const { convert } = require('html-to-text');

class UserController {
    async create (req, res) {
       

        //creating & saving documents
        const fileName = path.join('storage', 'reports',  `${Date.now()}.pdf`);
        const pdfDoc = new PDFDocument();
        const reportData = req.body.report;
        pdfDoc.pipe(fs.createWriteStream(fileName))
        reportData.contents.forEach(d => {
            pdfDoc.fontSize(17).text(d.heading);
            pdfDoc.fontSize(12).text(convert(d.description));
            

        });
        pdfDoc.end();

        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'paraskr@beginwebstudio.com', // generated ethereal user
              pass: 'Shiva@1937', // generated ethereal password
            }
        })
    
        const mailRes = await transporter.sendMail({
            from: 'paraskr@beginwebstudio.com',
            to: req.body.email,
            subject: 'Report',
            text: `your report`,
            attachments: [
                {
                    filename: 'report.pdf',
                    path: fileName
                }
            ]
        })


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

    async notify (req, res) {


        const user = await Users.findOne({_id: req.params.id})

        //const fileName = path.join('storage', 'reports', req.body.file)
        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'paraskr@beginwebstudio.com', // generated ethereal user
              pass: 'Shiva@1937', // generated ethereal password
            }
        })
    
        const mailRes = await transporter.sendMail({
            from: 'paraskr@beginwebstudio.com',
            to: user.email,
            subject: 'Report',
            text: `your report notification`,
            attachments: [
                {
                    filename: 'report.pdf',
                    path: user.report
                }
            ]
        })

        res.json({success: true})
    }
}

module.exports = new UserController;