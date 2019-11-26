var dbRegister = require('../model/register')
var dbLogin = require('../model/login')

module.exports = (req,res) => {
    if(!req.body.oldPass || !req.body.newPass || !req.body.confirmPass){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        dbLogin.findOne({userId : req.decoded.userId} , (err,loginData) => {
            if(err){
                res.json({
                    success:false,
                    msg:"Something went wrong."
                })
            }else if(!loginData && loginData == null){
                res.json({
                    success:false,
                    msg : "Please register first."
                })
            }else if(loginData.password !== req.body.oldPass){
                res.json({
                    success:false,
                    msg:"Please enter the correct password."
                })
            }else if(req.body.newPass == req.body.confirmPass){
                dbLogin.findOneAndUpdate({userId : req.decoded.userId} , {$set :{password : req.body.newPass}} , (err , updated) => {
                    if(err){
                        res.json({
                            success:false,
                            msg:"Please try again later."
                        })
                    }else{
                        dbRegister.findOneAndUpdate({email : req.decoded.email} , {$set : {password : req.body.newPass}} , (err , sUpdated)=> {
                            if(err){
                                res.json({
                                    success:false,
                                    msg:"Try again."
                                })
                            }else{
                                res.json({
                                    success:true,
                                    msg:"Password Changed."
                                })
                            }
                        })                        
                    }
                })
            }else{
                res.json({
                    success:false,
                    msg:"New Password and confirm password mismatched."
                })
            }
        })
    }
}