import computingApi from "../../../lib/utils/apiUtils/computingApi";

export default async (req,res) => {
    if(req.method === "POST" && req.body.secret === "hello"){
        const retrieveData = await computingApi(req.query.page);
        return res.json({result:retrieveData});
    }else{
        return res.json({message:"You are not authorized to fetch this data"});
    }
}