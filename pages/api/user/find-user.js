import mongoose from 'mongoose';
import User from '../../../lib/database/user-model';

//connect to mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
if(process.env.NODE_ENV == "production"){
    mongoose.connect(process.env.NEXTAUTH_DATABASE_URL)
    .then(()=>console.log("MongoDbAtlas is hot"))
    .catch(err=>console.log("Err..looks like something broke @mongoAtlas",err.message));
}else{
    mongoose.connect(process.env.NEXTAUTH_DATABASE_URL)
    .then(()=>console.log("MongoDb is hot"))
    .catch(err=>console.log("Err..looks like something broke",err.message));
}

export default async (req,res) => {
    if(req.method === 'POST') return res.json({user:await User.findById(req.body.id)});
} 