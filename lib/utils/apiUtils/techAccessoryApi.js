import axios from 'axios';
import cheerio from 'cheerio';
import { kongaCategoryQl } from '../kongaGraphQl';
import shuffle from '../shuffleData';
import { jumiaHtml, kongaHtml, karaHtml, pointekHtml } from '../traverseDom';

//JUMIA
const jumia = async (page) => {
    let data = [];
    try {
        let response = await axios.get(`https://www.jumia.com.ng/mobile-accessories/?page=${page}`);
        let $ = cheerio.load(response.data);
                data = [...jumiaHtml($)];
                response = await axios.get(`https://www.jumia.com.ng/computing-accessories/?page=${page}`);
                $ = cheerio.load(response.data);
                data = [...data, ...jumiaHtml($)];
        return data;
    } catch (error) {
        console.log(error.message);
        return data;
    }
}

//KARA
const kara = async (page) =>{
    let data = [];
      try {
          let response = await axios.get(`https://www.kara.com.ng/accessories-1144/?p=${page}`)
          let $ = cheerio.load(response.data);
                data = [...karaHtml($)];
                response = await axios.get(`https://www.kara.com.ng/phones-and-tablets/phones-and-tablets-accessories/?p=${page}`)
                $ = cheerio.load(response.data);
                    data = [...data, ...karaHtml($)];
                    return data;
      } catch (error) {
          console.log(error.message)
          return data;
      }
    }

//POINTEK ONLINE
const pointek = async (page) => {
    try {
        const response = await axios.get(`https://www.pointekonline.com/accessories-lagos-nigeria/page/${page}`);
        let $ = cheerio.load(response.data);
        return pointekHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

const konga = async (page) => {
    try {
     const laptopAccessory = await kongaCategoryQl(5228,page);
     const desktopAccessory = await kongaCategoryQl(5296,page);
     const laptopJson = await laptopAccessory.json();
     const desktopJson = await desktopAccessory.json();
     return [...kongaHtml(laptopJson), ...kongaHtml(desktopJson)];
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

  const techAccessoryApi = async (pagination) => {
    return await shuffle([...await jumia(pagination), ...await kara(pagination), ...await pointek(pagination), ...await konga(pagination)]);
}
export default techAccessoryApi;