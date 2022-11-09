const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id:String,
    username:String,
    email:String,
    profilePic:String
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)

