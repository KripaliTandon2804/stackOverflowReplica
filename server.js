const express = require ('express')
const app = express()
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')

const config = require('./config/config.json')

app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({extended : true}))

app.set('secretKey' , config.secret)

mongoose.connect(config.mongo_uri , {useNewUrlParser : true} , err => {
    if(!err){
        console.log("Database connected")
    }
})

app.listen(port , err => {
    if(!err){
        console.log(`Server started at port ${port}`)
    }else{
        console.log("Server not started.")
    }
})