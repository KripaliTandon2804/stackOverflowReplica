var nodemailer = require('nodemailer')

exports.sendMails = (email , subject , msg) => {
    return new Promise(function(resolve , reject) {
        
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user : 'kripalitandon2804@gmail.com',
                pass : 'abc@123'
            }
        })
        
        let message = {
            text : "",
            from : "",
            to : email,
            subject : subject,
            html : msg
        }

        transporter.sendMail(message , function(err , data) {
            if(err){
                reject(err)
            }else{
                resolve(data)
                console.log("############" ,data)
            }
        })
    })
}