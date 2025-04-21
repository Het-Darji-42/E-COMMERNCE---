const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const authMiddleware = (req, res, next) => { 
    const token = req.header('Authorization')

    if (!token){ 
        return res.status(400).json({
            message : "You'r not authorized : Register / Login First"
        })
    }
    
    try {
        const secret = process.env.JWT_SECRET
        const decode = jwt.verify(token, secret)
        req.user = decode;
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Token Is Not Valid",
            error : error.message
        })
    }
   
}

const adminMiddleware = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(404).json({
            message: "You Are Not Authorizes : Regster/Login First"
        })
    }

    try {
        const secret = process.env.JWT_SECRET
        const decode = jwt.verify(token, secret)
        req.user = decode

        if (req.user && req.user.role === "admin") {
            return next()
        }

        return res.status(400).json({
            message : "Only admin can access this"
        })
    } catch (error) {
        return res.status(401).json({
            message : "Token Is Invalid"
        })
    }
}

module.exports = { authMiddleware , adminMiddleware}