const mongoose = require('mongoose');

const menuItemsSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    restroId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    }
})


module.exports = mongoose.model('Menu', menuItemsSchema);