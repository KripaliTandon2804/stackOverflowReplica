var dbRegister = require('../model/register')
var mailer = require('./nodemailer')
var emailData = require('../routes/emailData')
var jwt = require('jsonwebtoken')
var ejs = require('ejs')
var path = require('path')

var generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000)
}

module.exports = async(req, res, next) => {
    try{
        let registerData = await dbRegister.findOne({email:req.body.email})
        if(registerData){
            res.json({
                success:false,
                msg:"User is already register"
            })
        }else if(!req.body.name || !req.body.phone || !req.body.email || !req.body.password){
            res.json({
                success:false,
                msg:"Please provide all the details."
            })
        }else{
            let savedData = await new dbRegister({
                name:req.body.name,
                phone:req.body.phone,
                email:req.body.email,
                password:req.body.password,
                createdAt : new Date(),
                emailVerify : {
                    otp : generateOtp(),
                    verified : false
                }
            }).save()
            let msg = "Your OTP for email verification is" + savedData.emailVerify.otp
            let token = jwt.sign({email : req.body.email ,phone : req.body.phone , name:req.body.name} , req.app.get('secretKey'))
            let updated = await dbRegister.findOneAndUpdate({email : req.body.email},{$set : {token : token}})
            emailObj = emailData.welcomeEmail(updated.name)
            let html = await ejs.renderFile(path.join(__dirname + '../../html/first.ejs'),emailObj)

            mailer.sendMails(savedData.email , msg ,html).then(mail => {
                res.json({
                    success:true,
                    msg:"Please verify token",
                    token:token
                })
            })
            
        }

    }catch(err){
        next(err)
    }
}
