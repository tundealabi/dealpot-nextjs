import electronicsApi from "../../../lib/utils/apiUtils/electronicsApi";

export default async (req,res) => {
    if(req.method === "POST" && req.body.secret === "hello"){
        const retrieveData = await electronicsApi(req.query.page);
        return res.json({result:retrieveData});
    }else{
        return res.json({message:"You are not authorized to fetch this data"});
    }
}