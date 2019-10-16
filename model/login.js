const mongoose = require ('mongoose')
var Schema = mongoose.Schema

var userLogin = new Schema ({
    userId : {
        type : String,
        unique : true
    },
    email : String,
    password:String,
    token:String,
    changePassword:String
})