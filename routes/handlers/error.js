const winston = require('winston')
const path = require('path')

const logRoot = path.join(__dirname , "/../../logs")

console.log("*********",logRoot)

const logger = winston.createLogger({
    level:'info',
    format: winston.format.simple(),
    exitOnError:false,
    transports:[
        new winston.transports.File({filename : `${logRoot}/error.log` , level: 'error' , options : {flags : 'w'}}),
        new winston.transports.File({filename : `${logRoot}/info.log` , level: 'info' ,options : {flags : 'w'}})
    ],
    exceptionHandlers:[
        new winston.transports.File({filename : `${logRoot}/exception.log` , options: {flags : 'w'}})
    ]
});

module.exports = logger;
