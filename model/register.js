const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const register = new Schema ({
    email : String,
    fullName : String,
    password : String,
    createdAt : {
        type:Date,
        default:new Date()
    },
    phone:Number,
    profilePic:String,
    emailVerify : {
        otp : Number,
        verified: Boolean,
        verifiedAt : Date
    },
    token : String
})

module.exports = mongoose.model('register' , register)