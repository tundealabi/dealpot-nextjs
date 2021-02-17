import dbConnect from '../../../lib/database/dbConnect';
import { NotifyUser } from '../../../lib/database/models/';

//connect to mongoose


export default async (req,res) => {
    if(req.method === 'GET') {
        try {
            await dbConnect();
        } catch (error) {
            console.log("something broke@ mongo",error);
        }
        return res.json({user:await NotifyUser.find()});
    }
} 