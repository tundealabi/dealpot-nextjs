import priceSchedular from '../../../lib/utils/apiUtils/runSchedular';



export default async (req,res) => {
    if(req.method === 'GET') {
        return res.json(await priceSchedular());
    }
} 