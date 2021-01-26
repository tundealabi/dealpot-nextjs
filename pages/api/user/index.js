import mongoose from 'mongoose';
import User from '../../../lib/database/user-model';




//connect to mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
if(process.env.NODE_ENV == "production"){
    mongoose.connect(process.env.NEXTAUTH_DATABASE_URL)
    .then(()=>console.log("MongoDbAtlas-session is hot"))
    .catch(err=>console.log("Err..looks like something broke @mongoAtlas",err.message));
}else{
    mongoose.connect(process.env.NEXTAUTH_DATABASE_URL)
    .then(()=>console.log("MongoDb-nextjs-session is hot"))
    .catch(err=>console.log("Err..looks like something broke",err.message));
}

export default async (req,res) => {
    if(req.method === 'POST'){
        const {id, family_name, picture, email} = req.body;
    const findUser = await User.find({googleId:id});
    if(!findUser.length){
        const newUser = await User.create({
             username:family_name,
             googleId:id,
             thumbnail:picture,
             email:email
        });
         res.json({userId:newUser._id});  
         mongoose.connection.close();
   }
   res.json({userId:findUser[0]._id});
   mongoose.connection.close();
    }else{
         res.json({name:"dhdjdj"})
         mongoose.connection.close();
    }
    
} 

// export default (req,res) => {
//     return res.json({name:"fhfhh"})
// }