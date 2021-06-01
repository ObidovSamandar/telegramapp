const mongoose = require('mongoose')
let usersSchema = new mongoose.Schema({
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
    },
    message: {
        type: Array,
        default:[],
        ref:'message'
    },
    session: {
        type: Array,
        ref:'session'
    }
})


module.exports = mongoose.model('user', usersSchema)