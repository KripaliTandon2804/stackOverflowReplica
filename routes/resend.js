const dbRegister = require('../model/register')
const mailer = require('./nodemailer')

var generateNewOtp = () => {
    return Math.floor(100000 + Math.random() * 900000)
}
module.exports = (req , res) => {
    const newOtp = generateNewOtp()
    dbRegister.findOne({email : req.decoded.email} , (err , registerData) => {
        if(err){
            res.json({
                success:false,
                msg:"Something went wrong."
            })
        }else if(!registerData || registerData == null){
            res.json({
                success:false,
                msg:"Please register first"
            })
        }else{
            dbRegister.findOneAndUpdate({email : req.decoded.email} , {$set : {'emailVerify.otp' : newOtp}} , (err , updated) => {
                if(err){
                    res.json({
                        success:false,
                        msg:"Please try again later."
                    })
                }else{
                    let subject = "OTP verify"
                    mailer.sendMails(updated.email , subject , updated.emailVerify.otp.toString())
                    res.json({
                        success:true,
                        msg:'OTP sent'
                    })
                }
            })
        }
    })

}