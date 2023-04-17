const Users = require('../models/UsersModel');

class UserController {
    async create (req, res) {
        const user = await Users.create(req.body);
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