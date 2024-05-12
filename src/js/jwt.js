const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.SECRET

const tokenBlacklist = new Set();

function newToken(user){
    return jwt.sign(
        { id: user.id }, 
        { tipo: user.tipo }, 
        SECRET, 
        { expiresIn: 300 }
    )
}

function verifyJWT(req, res, next){    
    const token = req.headers['x-access-token']

    if (token && tokenBlacklist.has(token)) return res.status(401).json({ message: 'Token inválido' });

    try {
        const decodedToken = jwt.verify(token, SECRET);
        req.id = decodedToken
        next()
    } catch (error) {
        console.log("jwt.verify ~ err:", error)
        res.status(401).json({ message: 'Token inválido' });
    }
}

function invalidToken(token){
    let userToken = token
    if (userToken) {
        tokenBlacklist.add(userToken)
        return { success: true, message: 'Token invalidado com sucesso.' };
    } else {
        return { success: false, message: 'Token ausente.' };
    }
} 

function verifyPermissionAluno(req, res, next){
    const token = req.headers['x-access-token']

    if (token && tokenBlacklist.has(token)) return res.status(401).json({ message: 'Token inválido' })

    try {
        const decodedToken = jwt.verify(token, SECRET);
        req.id = decodedToken
        req.tipo = decodedToken

        if(req.tipo !== 1) return res.status(403).json({ message: 'Usuario sem autorização!' })
        next()
    } catch (error) {
        console.log("jwt.verify ~ err:", error)
        res.status(401).json({ message: 'Token inválido' })
    }
}

function verifyPermissionPrae(req, res, next){
    const token = req.headers['x-access-token']

    if (token && tokenBlacklist.has(token)) return res.status(401).json({ message: 'Token inválido' })

    try {
        const decodedToken = jwt.verify(token, SECRET);
        req.id = decodedToken
        req.tipo = decodedToken

        if(req.tipo !== 2) return res.status(403).json({ message: 'Usuario sem autorização!' })
        next()
    } catch (error) {
        console.log("jwt.verify ~ err:", error)
        res.status(401).json({ message: 'Token inválido' })
    }
}

function verifyPermissionManutencao(req, res, next){
    const token = req.headers['x-access-token']

    if (token && tokenBlacklist.has(token)) return res.status(401).json({ message: 'Token inválido' })

    try {
        const decodedToken = jwt.verify(token, SECRET);
        req.id = decodedToken
        req.tipo = decodedToken

        if(req.tipo !== 3) return res.status(403).json({ message: 'Usuario sem autorização!' })
        next()
    } catch (error) {
        console.log("jwt.verify ~ err:", error)
        res.status(401).json({ message: 'Token inválido' })
    }
}

module.exports = {
    newToken,
    verifyJWT,
    invalidToken,
    verifyPermissionAluno,
    verifyPermissionPrae,
    verifyPermissionManutencao
}