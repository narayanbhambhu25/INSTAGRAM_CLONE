const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("conn to Mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("error to conn to Mongo",err)
})

// 3sOi6x3n7xHMsbqu

app.listen(PORT,()=>{
    console.log("Runninggggg on",PORT)
})
