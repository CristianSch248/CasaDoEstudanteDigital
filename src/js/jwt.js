const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.SECRET

const tokenBlacklist = new Set();

function newToken(user){
    return jwt.sign({userId: user.id}, SECRET, { expiresIn: 300 })
}

function verifyJWT(req, res, next){    
    const token = req.headers['x-access-token']

    if (token && tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    try {
        const decodedToken = jwt.verify(token, SECRET);
        req.userId = decodedToken
        next()
    } catch (error) {
        console.log("🚀 ~ jwt.verify ~ err:", error)
        res.status(401).json({ message: 'Token inválido' });
    }
}

function invalidToken(token){
    let userToken = token
    if (userToken) {
        tokenBlacklist.add(userToken)
        return { success: true, message: 'Token invalidado com sucesso' };
    } else {
        return { success: false, message: 'Token ausente' };
    }
} 

function verifyPermission(req, res, next){}

module.exports = {
    newToken,
    verifyJWT,
    invalidToken
}