import dbConnect from '../../../lib/database/dbConnect';
import { User } from '../../../lib/database/models/';




//connect to mongoose

export default async (req,res) => {
    if(req.method === 'POST'){
        try {
            await dbConnect();
        } catch (error) {
            console.log("something broke@ mongo",error);
        }
        
        const {id, family_name, email} = req.body;
        const findUser = await User.find({email});
    if(!findUser.length){
        const newUser = await User.create({
             username:family_name,
             googleId:id,
             email:email
        });
         return res.json({userId:newUser._id});
   }
   return res.json({userId:findUser[0]._id});
    }
    
} 

// export default (req,res) => {
//     return res.json({name:"fhfhh"})
// }