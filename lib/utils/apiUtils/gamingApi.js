import axios from 'axios';
import cheerio from 'cheerio';
import { kongaCategoryQl } from '../kongaGraphQl';
import shuffle from '../shuffleData';
import { jumiaHtml, kongaHtml, pointekHtml } from '../traverseDom';

//JUMIA
const jumia = async (page) => {
    try {
        const response = await axios.get(`https://www.jumia.com.ng/video-games/?page=${page}`);
        let $ = cheerio.load(response.data);
        return jumiaHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

//POINTEK ONLINE
const pointek = async (page) => {
    try {
        const response = await axios.get(`https://www.pointekonline.com/product-category/games-consoles/page/${page}`);
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
     const result = await kongaCategoryQl(1683,page);
     const resultJson = await result.json();
     return kongaHtml(resultJson);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

const gamingApi = async (pagination) => {
    return await shuffle([...await jumia(pagination), ...await pointek(pagination), ...await konga(pagination)]);
}
export default gamingApi;