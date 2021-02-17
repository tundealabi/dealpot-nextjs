import axios from 'axios';
import cheerio from 'cheerio';
import dbConnect from '../../../lib/database/dbConnect';
import { NotifyUser, User } from '../../../lib/database/models/';
import { kongaFindQl } from '../kongaGraphQl';
import numberFormat from '../numberFormat';

const priceSchedular = async () => {
    //connect to mongoose
    try {
        await dbConnect();
    } catch (error) {
        console.log("something broke@ mongo",error);
    }
    const notifyProducts = await NotifyUser.find();
    if(notifyProducts.length){
        notifyProducts.forEach(product=>{
            if(product.vendor == "Jumia"){
                jumiaNotify(product);
            }else if(product.vendor == "Payporte"){
                payPorteNotify(product);
            }else if(product.vendor == "Pointek online"){
                pointekOnlineNotify(product);
            }else if(product.vendor == "Kara"){
                karaNotify(product);
            }else if(product.vendor == "Konga"){
                kongaNotify(product);
            }else if(product.vendor == "Testweb"){
                TestwebNotify(product);
            }
        })
        return {message: "Schedular ran.. can you confirm update",users:await User.find()};
    }else{
        console.log("Schedular ran but no product to watch");
        return {message: "Schedular ran but no product to watch"};
    }
}

const TestwebNotify = async(product) => {
    try {
       let response = await axios.get(`${product.itemUrl}`)
       let $ = cheerio.load(response.data);
                  let currentProd = {
                    vendor:"Testweb",
                    itemPrice: $(".detail").find("p").first().text()
                };
           await compareProduct(product,currentProd);
    } catch (error) {
        console.log(error);
    }
}
const jumiaNotify = async(product)=>{
    try {
        let response = await axios.get(`${product.itemUrl}`)
        let $ = cheerio.load(response.data);
                   let currentProd = {
                     vendor:"Jumia",
                     itemPrice: $("#jm").find("span.-tal").first().text()
                 };
            await compareProduct(product,currentProd);
     } catch (error) {
         console.log(error);
     }
}
const payPorteNotify = async(product) => {
    try {
        let response = await axios.get(`${product.itemUrl}`)
        let $ = cheerio.load(response.data);
                   let currentProd = {
                     vendor:"Payporte",
                     itemPrice: $("span").find(".price").first().text()
                 };
            await compareProduct(product,currentProd);
     } catch (error) {
         console.log(error);
     }
}
const pointekOnlineNotify = async(product) => {
    try {
        let response = await axios.get(`${product.itemUrl}`)
        let $ = cheerio.load(response.data);
                   let currentProd = {
                     vendor:"Pointek online",
                     itemPrice: $("div.single-product-inner").find("div.summary.entry-summary > div > div.single-product-info > div.price-details > p span.amount").first().text()
                 };
            await compareProduct(product,currentProd);
     } catch (error) {
         console.log(error);
     }
}
const karaNotify = async(product) => {
    try {
        let response = await axios.get(`${product.itemUrl}`)
        let $ = cheerio.load(response.data);
                   let currentProd = {
                     vendor:"Kara",
                     itemPrice: $("span").find(".price").first().text()
                 };
            await compareProduct(product,currentProd);
     } catch (error) {
         console.log(error);
     }
}
const kongaNotify = async(product) => {
    try {
        const result = await kongaFindQl(product.sku);
      const resultJson = await result.json();
                   let currentProd = {
                     vendor:"Konga",
                     itemPrice: numberFormat(resultJson.data.product.special_price || resultJson.data.product.price)
                 };
            await compareProduct(product,currentProd);
     } catch (error) {
         console.log(error);
     }
}


const compareProduct = async(prev,current) => {
    let isPriceUpdated = current.itemPrice != prev.itemPrice;
    if(isPriceUpdated){
        prev.priceHistory.push(prev.itemPrice);
            await prev.save();
        prev.notifyUsers.forEach(async user=>{
            const notifyUser = await User.findById(user);
            const updateProduct = {message:`A product amongst your saved items from ${prev.vendor} has changed in price from ${prev.itemPrice} to ${current.itemPrice}`,img:prev.itemImage}
            notifyUser.notifications.unshift(updateProduct);
            notifyUser.numbOfNotification += 1;
            const findIdx = notifyUser.savedItems.findIndex(item=>item.itemUrl == prev.itemUrl);
            if(findIdx > -1) {
                notifyUser.savedItems[findIdx].priceHistory.push(prev.itemPrice); 
                notifyUser.savedItems[findIdx].itemPrice = current.itemPrice;
            }
            await notifyUser.save();
        })
        await NotifyUser.findByIdAndUpdate(prev._id,{$set:{itemPrice:current.itemPrice}});
        
    }else{
        console.log("Schedule ran but nothing to update")
    }
}


export default priceSchedular;