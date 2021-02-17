import axios from 'axios';
import cheerio from 'cheerio';
import { kongaCategoryQl } from '../kongaGraphQl';
import shuffle from '../shuffleData';
import { jumiaHtml, kongaHtml, karaHtml, pointekHtml } from '../traverseDom';

//JUMIA
const jumia = async (page) => {
    let data = [];
    try {
        let response = await axios.get(`https://www.jumia.com.ng/mobile-phones/?page=${page}`);
        let $ = cheerio.load(response.data);
                data = [...jumiaHtml($)];
                response = await axios.get(`https://www.jumia.com.ng/tablets/?page=${page}`);
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
    try {
        let response = await axios.get(`https://www.kara.com.ng/phones-and-tablets/?p=${page}&product_list_order=price&product_list_dir=desc`);
        let $ = cheerio.load(response.data);
            return karaHtml($);
    } catch (error) {
        console.log(error.message)
        return [];
    }
  }

  //PONTEK ONLINE
  const pointek = async (page) =>{
    let url = parseInt(page) % 2 === 0 ? `https://www.pointekonline.com/product-category/mobile-phones/page/${page}` 
                                        :
                                         `https://www.pointekonline.com/product-category/tablets/page/${page}`
      try {
          let response = await axios.get(url)
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
     const phone = await kongaCategoryQl(5297,page);
     const tablet = await kongaCategoryQl(5298,page);
     const phoneJson = await phone.json();
     const tabletJson = await tablet.json();
     return [...kongaHtml(phoneJson), ...kongaHtml(tabletJson)];
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

  const phonesApi = async (pagination) => {
    return await shuffle([...await jumia(pagination), ...await kara(pagination), ...await pointek(pagination), ...await konga(pagination)]);
}
export default phonesApi;