import axios from 'axios';
import cheerio from 'cheerio';
import { kongaCategoryQl } from '../kongaGraphQl';
import shuffle from '../shuffleData';
import { jumiaHtml, kongaHtml, karaHtml, pointekHtml } from '../traverseDom';

//JUMIA
const jumia = async (page) => {
    try {
        const response = await axios.get(`https://www.jumia.com.ng/office-products/?page=${page}`);
        let $ = cheerio.load(response.data);
        return jumiaHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

//KARA
const kara = async (page) =>{
    try {
        let response = await axios.get(`https://www.kara.com.ng/home-office-devices/?p=${page}`)
        let $ = cheerio.load(response.data);
            return karaHtml($);
    } catch (error) {
        console.log(error.message)
        return [];
    }
  }
  
  //POINTEK ONLINE
const pointek = async (page) => {
    try {
        const response = await axios.get(`https://www.pointekonline.com/product-category/printers/page/${page}`);
        let $ = cheerio.load(response.data);
        return pointekHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

  //KONGA

const konga = async (page) => {
    try {
     const result = await kongaCategoryQl(950,page);
     const resultJson = await result.json();
     return kongaHtml(resultJson);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

const officeschoolApi = async (pagination) => {
    return await shuffle([...await jumia(pagination), ...await kara(pagination), ...await pointek(pagination), ...await konga(pagination)]);
}
export default officeschoolApi;