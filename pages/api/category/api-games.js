import gamingApi from "../../../lib/utils/apiUtils/gamingApi";

export default async (req,res) => {
    if(req.method === "POST" && req.body.secret === "hello"){
        const retrieveData = await gamingApi(req.query.page);
        return res.json({result:retrieveData});
    }else{
        return res.json({message:"You are not authorized to fetch this data"});
    }
}