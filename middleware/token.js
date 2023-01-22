const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.userMiddleware = async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            const header = req.headers.authorization
            token = header.split(' ')[1]
            if (!token) {
                return res.status(404).json({ error: "invalid token" })
            }
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            return res.status(404).json({ error: "something going wrong" })
        }
    } else {
        return res.status(404).json({ error: "no user found" })
    }
}