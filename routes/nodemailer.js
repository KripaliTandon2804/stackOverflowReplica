var nodemailer = require('nodemailer')

exports.sendMails = (email , subject , html) => {
    return new Promise(function(resolve , reject) {
        
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user : 'mdaqib0111@gmail.com',
                pass : 'abc1234@'
            }
        })
        
        let message = {
            text : "",
            from : "",
            to : email,
            subject : subject,
            html : html
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