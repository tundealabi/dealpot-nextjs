import mongoose from "mongoose";
import  productSchema  from "../product-schema";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    email: String,
    savedItems:[ productSchema ],
    notifications:[],
    numbOfNotification:{
        type: Number,
        default: 0
    }
});

let User;

try {
    User = mongoose.model("user");
} catch (error) {
    User = mongoose.model("user",userSchema);
}



export default User;
