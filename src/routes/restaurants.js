const { Router } = require("express");
const router = Router();
const Restaurant = require('../models/Restraurant')
const mongoose = require("mongoose");
const Menu = require("../models/MenuItem");
const checkAuth = require('../middleware/checkAuth');


router.get('/',(req,res,next) => {
    Restaurant.find()
    .exec()
    .then(result => {
        res.status(200).json({
            restaurantsCount:result.length,
            Restaurants : result
        })
    })
    .catch(err => {
        console.log(err);
    })
})

router.post('/addRestaurant', async (req, res, next) => {
    const {name} = req.body
    console.log(name);
    Restaurant.findOne({name:name})
    .then(
        async (savedData)=>{
            if(savedData) return res.status(422).send({error:'restro alredy exist'})
            const restro = new Restaurant({
                _id : new mongoose.Types.ObjectId,
                name : req.body.name,
                restaurantImgUrl: req.body.restaurantImgUrl,
                address : req.body.address,
                cost:req.body.cost,
                cuisine : req.body.cuisine,
                offer:req.body.offer,
                rating : req.body.rating
            })
            restro.save()
            res.status(200).json({restro:restro})
        }
    )
    .catch(error =>{
        res.status(500).json({error})
    })

});

router.post('/addMenu', async (req, res, next) => {
    const {name} = req.body
    console.log(name);
    Menu.findOne({name:name})
    .then(
        async (savedData)=>{
            if(savedData) return res.status(422).send({error:'restro alredy exist'})
            const menu = new Menu({
                _id : new mongoose.Types.ObjectId,
                restroId:req.body.restroId,
                name : req.body.name,
                description : req.body.description,
                price:req.body.price,
                imageUrl: req.body.imageUrl,
                category : req.body.category
            })
            menu.save()
            res.status(200).json({menuItems:menu})
        }
    )
    .catch(error =>{
        res.status(500).json({error})
    })
});

// router.get('/getMenus',(req,res) => {
//     const {restroId} = req.body
//     Menu.find({ restroId: restroId })
//     .then(result => {
//         res.status(200).json({
//             menu_Count : result.length,
//             menu : result
//         })
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })
router.get('/:id',(req,res) => {
    const id = req.params.id
    Menu.find({ restroId: id })
    .then(result => {
        res.status(200).json({
            menu_Count : result.length,
            menu : result
        })
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router