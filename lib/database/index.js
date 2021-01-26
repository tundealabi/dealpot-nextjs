const mongoose = require("mongoose");
//connect to mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
if(process.env.NODE_ENV == "production"){
    mongoose.connect(config.get("cloudDatabase"))
    .then(()=>console.log("MongoDbAtlas is hot"))
    .catch(err=>console.log("Err..looks like something broke @mongoAtlas",err.message));
}else{
    mongoose.connect("mongodb://localhost/dealpot")
    .then(()=>console.log("MongoDb is hot"))
    .catch(err=>console.log("Err..looks like something broke",err.message));
}

exports.User = require("./user-model");
exports.NotifyUser = require("./notify-model");