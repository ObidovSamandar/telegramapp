const jwt = require('jsonwebtoken')
const config = require('../configs/config')


async function singToken(data){
    return  jwt.sign(data,config.JWT_SECRETWORD)
}


async function verifyToken(token){
    return jwt.verify(token,config.JWT_SECRETWORD)
}


module.exports = {
    singToken,
    verifyToken
}