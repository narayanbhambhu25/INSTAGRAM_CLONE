const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')
 

router.get('/protected',requireLogin,(req,res)=>{
    res.send("Hello User")
})

router.post('/signup',(req,res) =>{
    const {name,email,password} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error:"Please add all fields"})
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }

        bcrypt.hash(password,12)
        .then(hashedpassword =>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })

           user.save()
           .then(user=>{
              res.json({message:"saved successfully"})
            })
           .catch(err=>{
              console.log(err)
           })
        })          
    })

    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res) =>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"Please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invaild Email or Password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully login"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)  // created toen
                res.json({token}) 
            }
            else{
                return res.status(422).json({error:"Invaild Email or Password"})
            }
        })
        .catch(err=>{
            console.log(err) // this error is produced from developer side not from user side
        })
    })
})

module.exports = router