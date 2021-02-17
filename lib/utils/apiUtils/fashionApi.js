import axios from 'axios';
import cheerio from 'cheerio';
import { kongaCategoryQl } from '../kongaGraphQl';
import shuffle from '../shuffleData';
import { jumiaHtml, kongaHtml, payporteHtml } from '../traverseDom';

//JUMIA
const jumia = async (page) => {
    try {
        const response = await axios.get(`https://www.jumia.com.ng/category-fashion-by-jumia/?page=${page}`);
        let $ = cheerio.load(response.data);
        return jumiaHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

//PAY PORTE

const payporte = async (page) =>{
    let url = parseInt(page) % 2 === 0 ? `https://payporte.com/new-arrivals.html?p=${page}` : `https://payporte.com/dresses.html?p=${page}`;
    try {
        let response = await axios.get(url);
        let $ = cheerio.load(response.data);
            return payporteHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
  }

//KONGA

const konga = async (page) => {
    try {
     const result = await kongaCategoryQl(1259,page);
     const resultJson = await result.json();
     return kongaHtml(resultJson);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

const fashionApi = async (pagination) => {
    return await shuffle([...await jumia(pagination), ...await payporte(pagination), ...await konga(pagination)]);
}
export default fashionApi;