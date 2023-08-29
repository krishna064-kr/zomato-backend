const { Router } = require("express");
const router = Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/checkAuth');
const Address = require("../models/Address");
require('dotenv').config()


router.get('/',checkAuth,(req,res,next) => {
    User.find()
    .exec()
    .then(result => {
        res.status(200).json({
            numberOfUsers:result.length,
            Users : result
        })
    })
    .catch(err => {
        console.log(err);
    })
})

router.post('/signup',(req,res)=>{
    console.log(req.body);
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(422).json({error : 'plz fill all the fields'})
    }
    User.findOne({email:email})
        .then(
            async (savedUser) => {
                if(savedUser){
                    console.log({savedUser});
                    return res.status(422).send({error:'Invalid crenentials'})
                }
                bcrypt.hash(req.body.password,10,(error,hash)=>{
                    const user = new User({
                        _id : new mongoose.Types.ObjectId,
                        name : req.body.name,
                        email : req.body.email,
                        password : hash,
                        gender :req.body.gender,
                        userType : req.body.userType,
                        phone : req.body.phone,
                    })
                    if(error) return res.status(500).json({error})
                    user.save()
                    .then(result =>{
                        res.status(200).json({user:result})
                    })
                    .catch(error =>{
                        res.status(500).json({error})
                    })
                })
            }
        )
})

router.post('/login',(req,res,next) => {
    const {email,password} = req.body
    console.log({email,password});
    User.find({email})
    .exec()
    .then(user => {
        if(!user.length) return res.status(500).json({err:'user not exist'})
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            console.log({result});
            if(!result) return res.status(401).json({msg:'wrong password'})
            const token = jwt.sign({
                name:user[0].name,
                email:user[0].email,
                userType:user[0].userType,
                gender:user[0].gender
            },
            process.env.JWT_SECRET,
            { expiresIn:process.env.JWT_EXPIRE }
            )
            res.status(200).json({
                name:user[0].name,
                email:user[0].email,
                token:token,
                userType:user[0].userType,
                gender:user[0].gender
            })
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({err})
    })
})

router.delete('/deletedAccount',(req,res,next) => {
    const {email} = req.body
    console.log({email});
    User.deleteOne({email})
    .then(result => {
        console.log('deletd')
        res.status(200).json({
            msg:'You have deleted your account',
            User:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({err})
    })
})

// router.put('update/:id',(req,res) => {
//     User.findByIdAndUpdate({_id:req.params.id},{
//         $set:{
//             name : req.body.name,
//             // gender : req.body.gender,
//             email : req.body.email,
//             // phone : req.body.phone,
//             password : req.body.password
//         }
//     })
//     .then(result=>{
//         res.status(200).json({
//             "msg" : "student updated",
//         })
//     })
// })

router.post('/address', async (req, res) => {
    const {addressLine1} = req.body
    console.log(addressLine1);
    Address.findOne({addressLine1:addressLine1})
    .then(
        async (savedData)=>{
            if(savedData) return res.status(422).send({error:'this address alredy exist'})
            const address = new Address({
                _id : new mongoose.Types.ObjectId,
                userId : req.body.userId,
                addressLine1: req.body.addressLine1,
                addressLine2 : req.body.addressLine2,
                city:req.body.city,
                state : req.body.state,
                zipCode:req.body.zipCode
            })
            address.save()
            res.status(200).json({address})
        }
    )
    .catch(error =>{
        res.status(500).json({error})
    })

});

router.get('/address',(req,res) => {
    const {userId} = req.body
    Address.find({ userId: userId })
    .then(result => {
        res.status(200).json({
            numberOfAddress:result.length,
            addresses : result
        })
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router