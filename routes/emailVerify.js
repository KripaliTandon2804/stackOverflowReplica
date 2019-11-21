var dbRegister = require('../model/register')
var dbLogin = require('../model/login')
var mailer = require('./nodemailer')

var year = moment().format('YY')
var month = moment().format('MM')
var day = moment().format('DD')

var generateUserId = () => {
    return new Promise ((resolve , reject) => {
        var date = moment().format('DD-MM-YY')
        var acDate = moment(date , 'DD-MM-YY').toDate()
        dbLogin.count({} , (err , count) => {
            if(err){
                reject({
                    success:false,
                    msg:"Error while saving data."
                })
            }else{
                var newcount = count++
                var final = newcount > 9 ? "" + newcount : "0"+ newcount
                resolve('USID'+ year + month + day + final)
            }
        })
    })
}
module.exports = (req,res) => {
    if(!req.body.emailOtp){
        res.json({
            success:false,
            msg:"Please provide the email OTP."
        })
    }else{
        dbRegister.findOne({email :req.decoded.email} , (err ,registerData) => {
            if(err){
                res.json({
                    success:false,
                    msg:"Something went wrong."
                })
            }else if(!registerData || registerData == null){
                res.json({
                    success:false,
                    msg:"User not registered."
                })
            }else if(registerData.emailVerify.otp == req.body.emailOtp){

                generateUserId().then(USID => {
                    var date = moment().format('DD-MM-YY')
                    var acDate = moment(date , 'DD-MM-YY').toDate()
                        new dbLogin({
                            name:registerData.name,
                            phone:registerData.phone,
                            email:registerData.email,
                            password:registerData.password,
                            createdAt:new Date()
                        }).save((err , saved) => {
                            if(err){
                                res.json({
                                    success:false,
                                    msg:"Please try again later."
                                })
                            }else{
                                let msg = "Welcome"
                                let subject = "Welcome Mail"
                                dbRegister.findOneAndUpdate({email : req.decoded.email} ,{$set : {'emailVerify.verified' : true , 'emailVerify.verifiedAt' : new Date()}} , (err , updated) => {
                                    if(err){
                                        res.json({
                                            success:false,
                                            msg:"Error Occurred."
                                        })
                                    }else{
                                        mailer.sendMails(saved.email , subject , msg).then(data => {
                                            res.json({
                                                success:true,
                                                msg:"User registered successfully"
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
                })
                
            }
        })
    }
}