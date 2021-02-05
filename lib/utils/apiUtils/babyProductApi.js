import axios from 'axios';
import cheerio from 'cheerio';
import { kongaCategoryQl } from '../kongaGraphQl';
import shuffle from '../shuffleData';
import { jumiaHtml, kongaHtml } from '../traverseDom';

//JUMIA
const jumia = async (page) => {
    let data = [];
    console.log("jumia-page",page)
    try {
        const response = await axios.get(`https://www.jumia.com.ng/baby-products/?page=${page}`);
        let $ = cheerio.load(response.data);
        data = [...jumiaHtml($)];
        return data;
    } catch (error) {
        console.log(error.message);
        return data;
    }
}


//KONGA

const konga = async (page) => {
    console.log("konga-page",page)
    try {
     const result = await kongaCategoryQl(8,page);
     const resultJson = await result.json();
     return kongaHtml(resultJson);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

const babyProductApi = async (pagination) => {
    return await shuffle([...await jumia(pagination), ...await konga(pagination)]);
}
export default babyProductApi;