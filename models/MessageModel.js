const mongoose = require('mongoose')

const Schema = new mongoose.Schema
let messagesSchema = Schema({
    _id:{
        type: Schema.Types.ObjectId
    },
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