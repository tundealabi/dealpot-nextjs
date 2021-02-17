import dbConnect from '../../../lib/database/dbConnect';
import { User, NotifyUser } from '../../../lib/database/models';




export default async (req,res) => {
    
    if(req.method === 'POST') {
        // console.log("addtowishlist",req.body);
        //connect to mongoose
        try {
            await dbConnect();
        } catch (error) {
            console.log("mongoose@addtowishlist",error);
        }
        const user = await User.findById(req.body.id);
        let product = user.savedItems.find(item => item.itemUrl === req.body.itemUrl);
        if(!product){
            user.savedItems.push({
                    vendor:req.body.vendor,
                    itemName:req.body.itemName,
                    itemImage:req.body.itemImage,
                    itemPrice:req.body.itemPrice,
                    itemUrl:req.body.itemUrl,
                    showLike: true,
                    sku:req.body.sku || 0
            });
            await user.save();
            res.json({message:"add-wishlist"});
        }else{
            const prodToBeRemoved = await user.savedItems.id(product._id);
            if(prodToBeRemoved.notify){
                let findProdNotify = await NotifyUser.findOne({itemUrl:product.itemUrl});
                const findUserIdx = findProdNotify.notifyUsers.findIndex(id=>id == req.body.id);
                findProdNotify.notifyUsers.splice(findUserIdx,1);
                if(!findProdNotify.notifyUsers.length){
                    await NotifyUser.findByIdAndDelete(findProdNotify._id);
                    console.log("No more watching this product notification")
                }else{
                    await findProdNotify.save();
                }
            }
            await prodToBeRemoved.remove();
            await user.save();
            res.json({message:"remove-wishlist"});
        }
        
    }
} 