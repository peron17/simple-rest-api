const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const user = await userModel.findOne({_id: data._id, 'tokens.token': token})
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not Authorized' })
    }
}

module.exports = auth