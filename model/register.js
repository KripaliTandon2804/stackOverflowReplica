const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const register = new Schema ({
    email : String,
    fullName : String,
    password : String,
    createdAt : {
        type:Date,
        default:new Date
    },
    phone:Number,
    profilePic:String
})