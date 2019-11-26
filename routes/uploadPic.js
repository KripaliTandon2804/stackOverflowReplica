var multer = require('multer')
var dbRegister = require('../model/register')

module.exports = (req,res) => {

    var storage = multer.diskStorage({
        destination:function (req,res,cb){
            cb(null,'./routes/profilePic')
        },
        filename: function(req,file,cb) {
            cb(null , 'pic' + Date.now() + '-' + file.originalname)
        }
    })

    var upload = multer({storage : storage})
    
    var cpUpload = upload.fields([{ name : 'profile' , maxCount : 1}])

    cpUpload(req,res,err => {
        if(err){
            res.json({
                success:false,
                msg:"Invalid File Extension."
            })
        }else if(!req.files.profile){
            res.json({
                success:false,
                msg:"Please provide all the details"
            })
        }else{
            dbRegister.findOne({email : req.decoded.email} , (err , registerData) => {
                console.log("*************" , registerData)
                if(err){
                    res.json({
                        success:false,
                        msg:"Something went wrong"
                    })
                }else if (!registerData || registerData == null){
                    res.json({
                        success:false,
                        msg:"Please register first."
                    })
                }else{
                    profile = req.files.profile[0].filename
                    //console.log("^^^^^^^^^^^^^^^" , req.files)
                    dbRegister.findOneAndUpdate({email:req.decoded.email} ,{$push : {profilePic : profile}}, (err ,data) => {
                        if(err){
                            res.json({
                                success:false,
                                msg:"Please try again later"
                            })
                        }else{
                            res.json({
                                success:true,
                                msg:"Profile picture uploaded."
                            })
                        }
                    })
                }
            })
        }
    })
}