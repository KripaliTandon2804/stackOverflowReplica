var jwt = require('jsonwebtoken')

var tokenVerify = function(req,res,next){
    
    var token = req.headers['x-access-token']
    if(token){
        jwt.verify(token , req.app.get('secretKey') , function(err , decoded){
            console.log("@@@@@@@@@@@",decoded)
            if(err){
                res.json({
                    success:false,
                    msg:"Failed to authenticate token"
                })
            }else{
                req.decoded = decoded;
                next()
            }
        })
    }else{
        res.json({
            success:true,
            msg:"Token not found."
        })
    }
}

module.exports = tokenVerify