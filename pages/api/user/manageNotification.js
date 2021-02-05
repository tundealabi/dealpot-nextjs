import dbConnect from '../../../lib/database/dbConnect';
import { User } from '../../../lib/database/models';

export default async (req,res) => {
    if(req.method === "POST"){
        try {
            await dbConnect();
        } catch (error) {
         console.log("something broke@ mongo",error);
        }
        if(req.body.type === "resetnotification"){
            await User.findByIdAndUpdate(req.body.id,{$set:{numbOfNotification:0}},{new:true});
            return res.json({message:true,type:"read notification"});
        }else if(req.body.type === "clearallnotification"){
            await User.findByIdAndUpdate(req.body.id,{$set:{notifications:[]}},{new:true});
            return res.json({message:true,type:"clear notification"});
        }
        
    }
}