import axios from 'axios';
import cheerio from 'cheerio';
import { kongaCategoryQl } from '../kongaGraphQl';
import shuffle from '../shuffleData';
import { jumiaHtml, kongaHtml } from '../traverseDom';

//JUMIA
const jumia = async (page) => {
    try {
        const response = await axios.get(`https://www.jumia.com.ng/automobile/?page=${page}`);
        let $ = cheerio.load(response.data);
        return jumiaHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
}


//KONGA

const konga = async (page) => {
    try {
     const result = await kongaCategoryQl(2051,page);
     const resultJson = await result.json();
     return kongaHtml(resultJson);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

const automobileApi = async (pagination) => {
    return await shuffle([...await jumia(pagination), ...await konga(pagination)]);
}
export default automobileApi;