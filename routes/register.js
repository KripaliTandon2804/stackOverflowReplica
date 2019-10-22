var dbRegister = require('../model/register')

module.exports = (req,res)=> {

    if(!req.body.name || !req.body.phone || !req.body.email || !req.body.password){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        //console.log("dataaaaaaaaaaaa")
        dbRegister.findOne({email:req.body.email} ,(err ,data) => {
            
            if(err){
                res.json({
                    success:false,
                    msg: "Something went wrong"
                })
            }else if(!data || data == null){
                new dbRegister ({
                    name:req.body.name,
                    phone:req.body.phone,
                    email:req.body.email,
                    password:req.body.password,
                    createdAt : new Date()
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
            }else{
                dbRegister.findOneAndUpdate({email:req.body.email} , {name : req.body.name , password : req.body.password , phone : req.body.phone} , (err , update) => {
                    if(err){
                        res.json({
                            success:false,
                            msg:"Something went wrong"
                        })
                    }else{
                        res.json({
                            success:true,
                            msg:"Registration done."
                        })
                    }
                })
            }                
            
        })
    }
}