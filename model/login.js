const mongoose = require ('mongoose')
var Schema = mongoose.Schema

var userLogin = new Schema ({
    userId : {
        type : String,
        unique : true
    },
    email : String,
    name : String,
    password:String,
    phone : Number,
    token:String,
    changePassword:String,
    emailVerify : {
        otp : Number,
        verified : Boolean,
        verifiedAt : Date
    },
    createdAt : Date
})

module.exports = mongoose.model('login' , userLogin)