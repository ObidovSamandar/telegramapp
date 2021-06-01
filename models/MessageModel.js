const mongoose = require('mongoose')

let messagesSchema = new mongoose.Schema({
    message:{
        type:Array,
        required:true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
})


module.exports = mongoose.model('message', messagesSchema)