const mongoose = require('mongoose')
const Schema = new mongoose.Schema
let usersSchema = Schema({
    name:{
        type:String,
        required:true
    },
    user_name: {
        type: String,
        required: true
    },
    chat_id: {
        type: String,
        required: true
    },
    socket_id: {
        type: String,
        required: true
    },
    message: {
        type: Array,
        default:[],
        ref:'messages'
    },
    session: {
        type: Array,
        ref:'sessions'
    }
})


module.exports = mongoose.model('user', usersSchema)