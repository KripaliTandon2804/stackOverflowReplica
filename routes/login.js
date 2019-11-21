var dbLogin = require('../model/login')
var dbRegister = require('../model/register')
var moment = require('moment')
var jwt = require('jsonwebtoken')

module.exports = (req,res) => {
    if(!req.body.email || !req.body.password){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        dbLogin.findOne({email:req.body.email} , (err ,registerData) => {            
            if(err){
                res.json({
                    success:false,
                    msg:"Please try again."
                })
            }else if(!registerData || registerData == null){
                res.json({
                    success:false,
                    msg:"Please register first."
                })
            }else if(registerData.password == req.body.password){                                                                                  
            var tokenData = {
                _id : saved._id,
                userId:saved.userId,
                name : saved.name,
                email:saved.email,
                phone:saved.phone
            }
            var token = jwt.sign(tokenData ,req.app.get('secretKey'))
            res.json({
                success:true,
                msg:"Login successful",
                token:token
            })                               
            }else{
                res.json({
                    success:false,
                    msg:"Incorrect Password"
                })
            }
        })
    }
}
