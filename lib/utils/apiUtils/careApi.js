import axios from 'axios';
import cheerio from 'cheerio';
import { kongaCategoryQl } from '../kongaGraphQl';
import shuffle from '../shuffleData';
import { jumiaHtml, kongaHtml, karaHtml } from '../traverseDom';

//JUMIA
const jumia = async (page) => {
    try {
        const response = await axios.get(`https://www.jumia.com.ng/health-beauty/?page=${page}`);
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
          let response = await axios.get(`https://www.kara.com.ng/health-personal-care/?p=${page}`)
          let $ = cheerio.load(response.data);
              return karaHtml($);
      } catch (error) {
          console.log(error.message)
          return [];
      }
    }

//KONGA

const konga = async (page) => {
    try {
     const result = await kongaCategoryQl(4,page);
     const resultJson = await result.json();
     return kongaHtml(resultJson);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

const careApi = async (pagination) => {
    return await shuffle([...await jumia(pagination), ...await kara(pagination), ...await konga(pagination)]);
}
export default careApi;