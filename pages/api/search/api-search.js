import searchApi from "../../../lib/utils/apiUtils/searchApi";

export default async (req,res) => {
    if(req.method === "POST" && req.body.secret === "hello"){
        if(Number(req.query.page > 50)){
            return res.json({result:[]});
        }else{
            let searchQuery = req.query.q != "false" ? req.query.q : false;
            const retrieveData = await searchApi(searchQuery,req.query.page);
            return res.json({result:retrieveData});
        }
    }else{
        return res.json({message:"You are not authorized to fetch this data"});
    }
}