const mongoose = require('mongoose')
const Schema = mongoose.Schema

var profile = new Schema ({
    userId:String,
    email:String,
    fullName:String,
    phone:Number,
    profilePic:String,
    website:String,
    designation:String,
    companyName:String,
    language:{},
    createdAt:Date
})

module.exports = mongoose.model ('profile' , profile)