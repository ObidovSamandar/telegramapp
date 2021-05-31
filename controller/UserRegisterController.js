const user = require('../models/UsersModel')
module.exports = class UserController{
    createUser = async function (payload){
        try {
            let createUser = await user.create(payload)
            return createUser
        } catch (error) {
            console.log(error.message)
        }
    }

    updateUser = async function (_id,payload){
        try {
            let updateUser = await user.findOneAndUpdate({_id},payload)
            return updateUser
        } catch (e) {
            console.log(e.message)
        }
    }

    deleteUser = async  function (_id){
        try {
            let deleteUser = await user.findOneAndDelete({_id})  
            return deleteUser
        } catch (e) {
            console.log(e.message)
        }
    }

    getUser = async function(id){
        try {
            let getUser = await user.findOne({_id:id})
            return getUser
        } catch (e) {
            console.log(e.message)
        }
    }
}