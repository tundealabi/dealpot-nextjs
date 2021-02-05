import dbConnect from '../../../lib/database/dbConnect';
import { User } from '../../../lib/database/models/';

//connect to mongoose


export default async (req,res) => {
    console.log("find-user",req.body)
    if(req.method === 'POST') {
        try {
            await dbConnect();
        } catch (error) {
            console.log("something broke@ mongo",error);
        }
        res.json({user:await User.findById(req.body.id)});
    }
} 