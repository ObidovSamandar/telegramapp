const Path = require('path')
require('dotenv').config({path:Path.join(__dirname,'../','.env')})

let config = {
    HTTPORT : getConfig('HTTP_PORT',''),
    MONGODB_URI :getConfig('Mongodb_URI',''),
    BOT_TOKEN: getConfig('TOKEN',''),
    JWT_SECRETWORD: getConfig('SECRET_WORD','')
}



function getConfig(name, addition=""){
    if(process.env[name]){
        return process.env[name] || ''
    }

    return addition
}

module.exports =config