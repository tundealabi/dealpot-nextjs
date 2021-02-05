import dbConnect from '../../../lib/database/dbConnect';
import { User, NotifyUser } from '../../../lib/database/models';

//connect to mongoose

export default async (req,res) => {
    if(req.method === 'POST') {
        // console.log("addtowishlist",req.body);
        try {
            await dbConnect();
        } catch (error) {
            console.log("mongoose@addtonotify",error);
        }
        const user = await User.findById(req.body.id);
        let savedProductIdx = user.savedItems.findIndex(item => item.itemUrl === req.body.itemUrl);
        let findProd = await NotifyUser.findOne({itemUrl:req.body.itemUrl});
        if(!findProd){
            const result = await NotifyUser.create({
                vendor:req.body.vendor,
                itemName:req.body.itemName,
                itemImage:req.body.itemImage,
                itemPrice:req.body.itemPrice,
                itemUrl:req.body.itemUrl,
                sku:req.body.sku || 0,
                notifyUsers:[req.body.id]
            })
            if(savedProductIdx > -1){
                user.savedItems[savedProductIdx].notify = true;
                await user.save();
            }else{
                user.savedItems.push({
                    vendor:req.body.vendor,
                    itemName:req.body.itemName,
                    itemImage:req.body.itemImage,
                    itemPrice:req.body.itemPrice,
                    itemUrl:req.body.itemUrl,
                    sku:req.body.sku || 0,
                    showLike: true,
                    notify: true
                });
                await user.save();
            }
            return res.json({message:"add-notify"});
        }else{
            const findUserIdx = findProd.notifyUsers.findIndex(id=>id == req.body.id);
            if(findUserIdx > -1){
                findProd.notifyUsers.splice(findUserIdx,1);
                if(!findProd.notifyUsers.length){
                    await NotifyUser.findByIdAndDelete(findProd._id);
                    console.log("No more watching this product notification")
                }else{
                    await findProd.save();
                }
                if(savedProductIdx > -1){
                    user.savedItems[savedProductIdx].notify = false;
                    await user.save();
                }
                return res.json({message:"remove-notify"});
        }else{
            findProd.notifyUsers.push(req.body.id);
            await findProd.save();
            if(savedProductIdx < 0){
                user.savedItems.push({
                    vendor:req.body.vendor,
                    itemName:req.body.itemName,
                    itemImage:req.body.itemImage,
                    itemPrice:req.body.itemPrice,
                    itemUrl:req.body.itemUrl,
                    sku:req.body.sku || 0,
                    showLike: true,
                    notify: true,
                    priceHistory:[...findProd.priceHistory]
                });
                user.save();
            }else{
                user.savedItems[savedProductIdx].notify = true;
                
                await user.save();
            }
        }
        return res.json({message:"remove-notify"});
        }
    }
};
