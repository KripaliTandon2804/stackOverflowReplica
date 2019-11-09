var dbProfile = require('../model/profile')
var dbLogin = require('../model/login')

module.exports = (req,res) => {
if(!req.body.website || !req.body.companyName || !req.body.designation ||!req.body.language){
    res.json({
        success:false,
        msg:"Please provide all the details."
    })
}else{
    dbLogin.findOne({email : req.decoded.email} ,(err , loginData) => {
        if(err){
            res.json({
                success:false,
                msg:"Something went wrong."
            })
        }else if(!loginData || loginData == null){
            res.json({
                success:false,
                msg:"User not found"
            })
        }else{
            new dbProfile ({
                userId:loginData.userId,
                email:req.decoded.email,
                phone: loginData.phone,
                fullName : loginData.name,
                website: req.body.website,
                companyName : req.body.companyName,
                designation: req.body.designation,
                language:req.body.language
            }).save((err , saved) => {
                if(err){
                    res.json({
                        success:false,
                        msg:"Please try again later."
                    })
                }else{
                    res.json({
                        success:true,
                        msg:"Profile saved."
                    })
                }
            })
        }
    })
}
}
