const mongoose = require('mongoose')
const config = require('../configs/config')

module.exports = async function () {
    return await mongoose.connect(config.MONGODB_URI, {
        useCreateIndex:true,
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
}