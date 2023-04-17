const Admins = require('../models/AdminsModels');
const jwt = require('jsonwebtoken');
const Tokens = require('../models/TokenModels')
const bcryptjs = require('bcryptjs')

const accessTokenSecrete = 'b24cd70fa9134d5019250ccc9e43e223aea3974dab998c870cf42f4ddf3b14745cbaf3fe9c8a5a7eedf74c5dc48b84d641d07a90f09bb4a568c7f6e47a5f437b';
const refreshTokenSecrete = 'df67b54b8e77a814b5b3dea73f78a7a5bb216f744d5dc9e98b769e4718c5da641beff1c29863398afef1f740a1eb573916107a9a80bbc986703fc8375aa12582';

class AdminsController {
    async create(req, res) {
        const admin = await Admins.findOne({email: req.body.email});
        if(admin){
            return res.status(400).json({message: 'Email already in use'})
        }
       
        const salt = await bcryptjs.genSalt(10);
        const hashP = await bcryptjs.hash(req.body.password, salt)
        console.log(hashP)
        const data = {...req.body, password: hashP}
        const newAdmin = await Admins.create(data)
        res.json(newAdmin)
    }

    async verify(req, res){
        const {email, password, remember} = req.body;

        if(!email) return res.status(400).json({message: "Email is required"});
        if(!password) return res.status(400).json({message: "Password is required"});

        let admin = await Admins.findOne({email});

        if(!admin) return res.status(400).json({message: "Email does not exist"});

        const match = await bcryptjs.compare(password, admin.password);

        if(!match) return res.status(400).json({message: "Wrong Password"});

        if(remember){
            const accessToken = await jwt.sign({_id: admin._id, email: admin.email}, accessTokenSecrete, {expiresIn: '1 days'});
            const refreshToken = await jwt.sign({_id: admin._id, email: admin.email}, refreshTokenSecrete, {expiresIn: '360 days'});

            const token = await Tokens.findOneAndUpdate({user_email: email},{
                token: refreshToken,
                user_id: admin._id,
                user_email: admin.email
            }, {returnDocument: 'after', upsert: true});

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })

            return res.json({status: true, admin, message: "Logged in."})
        }
        if(!remember){
            const accessToken = await jwt.sign({_id: admin._id, email: admin.email}, accessTokenSecrete, {expiresIn: '1 days'});
            const refreshToken = await jwt.sign({_id: admin._id, email: admin.email}, refreshTokenSecrete, {expiresIn: '1 days'});

            const token = await Tokens.findOneAndUpdate({user_email: email}, {
                token: refreshToken,
                user_id: admin._id,
                user_email: email
            }, {returnDocument: 'after', upsert: true});

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true
            })
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true
            })

            return res.json({status: true, admin, message: "Logged in."})
        }
    }

    async auto(req, res) {
        const {accessToken, refreshToken: refreshTokenFromCookie} = req.cookies;
        if(accessToken){
            const adminData = jwt.verify(accessToken, accessTokenSecrete)
        if(adminData){
            let admin = await Admins.findOne({_id: adminData._id});
            return res.json({status: true, admin, message: "Logged in."})
        }
        }

        if(refreshTokenFromCookie){
            const adminData = jwt.verify(refreshTokenFromCookie, refreshTokenSecrete);
            if(adminData){

            const accessToken = await jwt.sign({_id: admin._id, email: admin.email}, accessTokenSecrete, {expiresIn: '1 days'});
            const refreshToken = await jwt.sign({_id: admin._id, email: admin.email}, refreshTokenSecrete, {expiresIn: '360 days'});

            const token = await Tokens.findOneAndUpdate({user_email: email},{
                token: refreshToken,
                user_id: admin._id,
                user_email: admin.email
            }, {returnDocument: 'after', upsert: true});

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })

            return res.json({status: true, admin, message: "Logged in."})

            }
        }

        res.json({auth: false})
    }

    async refresh(req, res) {

        const {refreshToken: refreshTokenFromCookie} = req.cookies;
        let adminData;

        try {
            adminData = await tokenServices.verifyRefreshToken(refreshTokenFromCookie);
            
        }catch (err) {
            return res.status(401).json({message: "Invalid Token"});
        }
    }
}

module.exports = new AdminsController;