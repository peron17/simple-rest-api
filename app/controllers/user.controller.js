const UserModel = require('../models/user.model')

// register new user
exports.store = async (req, res) => {
    try {
        const user = new UserModel(req.body)
        await user.save();
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
}

// login
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await UserModel.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
}

// show my profile
exports.profile = (req, res) => {
    res.status(200).send(req.user)
}

// logout
exports.logout = (req, res) => {}

// logout all device
exports.logoutall = (req, res) => {}
