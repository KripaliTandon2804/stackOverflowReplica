var dbRegister = require('../model/register')
var mailer = require('./nodemailer')
var jwt = require('jsonwebtoken')

var generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000)
}

module.exports = (req,res)=> {
    dbRegister.findOne({email:req.body.email} , (err ,registerData) => {
        if(err){
            res.json({
                success:false,
                msg:"Something went wrong."
            })
        }else{
            if(!req.body.name || !req.body.phone || !req.body.email || !req.body.password){
                res.json({
                    success:false,
                    msg:"Please provide all the details."
                })
            }else{
                    new dbRegister ({
                        name:req.body.name,
                        phone:req.body.phone,
                        email:req.body.email,
                        password:req.body.password,
                        createdAt : new Date(),
                        //profilePic:req.body.profilePic
                        emailVerify : {
                            otp : generateOtp(),
                            verified : false
                        }
                    }).save((err ,savedData) => {
                        if(err){
                            res.json({
                                success:false,
                                msg:"Please try again"
                            })
                        }else{
                            let msg = "Your OTP for email verification is"
                            //console.log("*************" , savedData)
                            let token = jwt.sign({email : req.body.email ,phone : req.body.phone , name:req.body.name} , req.app.get('secretKey'))
                            //console.log("++++++++",token)
                            dbRegister.findOneAndUpdate({email : req.body.email} ,{$set : {token : token}} ,(err ,updated) => {
                                if(err){
                                    res.json({
                                        success:false,
                                        msg:"Please try again later.",
                                        err:err
                                    })
                                }else{
                            console.log("::::::::::::",savedData.email)
                                    mailer.sendMails(savedData.email , msg ,savedData.emailVerify.otp.toString()).then(mail => {
                                        console.log("&&&&&&&&&&&&&" ,savedData.email)
                                        res.json({
                                            success:true,
                                            msg:"Please verify email",
                                            token:token
                                        })
                                    }).catch(err => {
                                        res.json({
                                            success:false,
                                            err:err
                                        })
                                    })                                    
                                }
                            })
                        }
                    })                                                   
                }
            }
        })
    }  
