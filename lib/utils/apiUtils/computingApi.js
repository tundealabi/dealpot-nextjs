import axios from 'axios';
import cheerio from 'cheerio';
import { kongaCategoryQl } from '../kongaGraphQl';
import shuffle from '../shuffleData';
import { jumiaHtml, kongaHtml, karaHtml, pointekHtml } from '../traverseDom';

//JUMIA
const jumia = async (page) => {
    try {
        const response = await axios.get(`https://www.jumia.com.ng/computers-tablets/?page=${page}`);
        let $ = cheerio.load(response.data);
        return jumiaHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

//KARA
const kara = async (page) =>{
    let data = [];
      try {
          let response = await axios.get(`https://www.kara.com.ng/desktop-computers/?p=${page}`)
          let $ = cheerio.load(response.data);
                data = [...karaHtml($)];
                response = await axios.get(`https://www.kara.com.ng/laptops/?p=${page}`)
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
        if(page == 1){
            const response = await axios.get(`https://www.pointekonline.com/laptops-lagos-nigeria/page/${page}`);
            let $ = cheerio.load(response.data);
            return pointekHtml($);
        }
    throw new Error("Max page reached for pointek computerApi route");
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

//KONGA

const konga = async (page) => {
    try {
     const laptop = await kongaCategoryQl(5230,page);
     const desktop = await kongaCategoryQl(5229,page);
     const laptopJson = await laptop.json();
     const desktopJson = await desktop.json();
     return [...kongaHtml(laptopJson), ...kongaHtml(desktopJson)];
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

const computingApi = async (pagination) => {
    return await shuffle([...await jumia(pagination), ...await kara(pagination), ...await pointek(pagination), ...await konga(pagination)]);
}
export default computingApi;