import sportsApi from "../../../lib/utils/apiUtils/sportsApi";

export default async (req,res) => {
    if(req.method === "POST" && req.body.secret === "hello"){
        if(Number(req.query.page > 50)){
            return res.json({result:[]});
        }else{
        const retrieveData = await sportsApi(req.query.page);
        return res.json({result:retrieveData});
        }
    }else{
        return res.json({message:"You are not authorized to fetch this data"});
    }
}