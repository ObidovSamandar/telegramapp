const mongoose = require('mongoose')
const Schema = new mongoose.Schema
let usersSchema = Schema({
    createdAt:{
        type:Date,
        default: Date.now
    },
    ipAddress: {
        type: String,
        required: true
    },
    user_agent: {
        type: String,
        required: true
    },
    socket_id: {
        type: String,
        required: true
    },
})


module.exports = mongoose.model('session', usersSchema)