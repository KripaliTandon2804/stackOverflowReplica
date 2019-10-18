var dbRegister = require('../model/register')

module.exports=(req,res)=> {
    if(!req.body.name || !req.body.phone || !req.body.email || !req.body.password){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        dbRegister.findOne({email:req.body.email} ,(err ,data) => {
            if(err){
                res.json({
                    success:false,
                    msg: "Something went wrong"
                })
            }else if(!data || data == null){
                res.json({
                    success:false,
                    msg:"User not found."
                })
            }else{
                new dbRegister ({
                    name:req.body.name,
                    phone:req.body.phone,
                    email:req.body.email,
                    password:req.body.password,
                    //profilePic:req.body.profilePic
                }).save((err ,savedData) => {
                    if(err){
                        res.json({
                            success:false,
                            msg:"Please try again"
                        })
                    }else{
                        res.json({
                            success:true,
                            msg:"User registered."
                        })
                    }
                })
            }
        })
    }
}