const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    vendor:{
        type:String,
        required:true
    },
    itemName:{
        type:String,
        required:true
    },
    itemImage:{
        type:String,
        required:true
    },
    itemPrice:{
        type:String,
        required:true
    },
    itemUrl:{
        type:String,
        required:true
    },
    notify:{
        type:Boolean,
        default:false
    },
    showLike:{
        type:Boolean,
        default:false
    },
    sku: Number,
    priceHistory:[String]
});


module.exports = productSchema;