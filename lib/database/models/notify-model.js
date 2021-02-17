import mongoose from "mongoose";

let NotifyUser;

try {
    NotifyUser = mongoose.model("notify");
} catch (error) {
    NotifyUser = mongoose.model("notify",new mongoose.Schema({
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
        sku: Number,
        priceHistory:[ String ],
        notifyUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            }
        ]
    }));
}

export default NotifyUser;