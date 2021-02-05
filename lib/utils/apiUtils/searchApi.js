import axios from 'axios';
import cheerio from 'cheerio';
import { kongaSearchQl } from '../kongaGraphQl';
import shuffle from '../shuffleData';
import { jumiaHtml, kongaHtml, karaHtml, pointekHtml, payporteHtml } from '../traverseDom';

//JUMIA
const jumia = async (search,page) => {
    const url = search ? `https://www.jumia.com.ng/catalog/?q=${search}&page=${page}` : `https://www.jumia.com.ng/catalog/?page=${page}`;
    try {
        const response = await axios.get(url);
        let $ = cheerio.load(response.data);
        return jumiaHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

//KARA
const kara = async (search,page) =>{
    try {
        let response = await axios.get(`https://www.kara.com.ng/catalogsearch/result/index/?p=${page}&q=${search}`);
        let $ = cheerio.load(response.data);
            return karaHtml($);
    } catch (error) {
        console.log(error.message)
        return [];
    }
  }

  //PAY PORTE

const payporte = async (search,page) =>{
    try {
        if(search){
            let response = await axios.get(`https://payporte.com/catalogsearch/result/index/?p=${page}&q=${search}`);
            let $ = cheerio.load(response.data);
            return payporteHtml($);
        }
        throw new Error("Cannot make request to payporte search API because there is no search query");

    } catch (error) {
        console.log(error.message);
        return [];
    }
  }
  
//POINTEK ONLINE
const pointek = async (search,page) => {
    try {
        const url = search ? `https://www.pointekonline.com/page/${page}/?s=${search}&post_type=product` : `https://www.pointekonline.com/page/${page}/?post_type=product`;
            const response = await axios.get(url);
            let $ = cheerio.load(response.data);
            return pointekHtml($);

    } catch (error) {
        console.log(error.message);
        return [];
    }
}

//KONGA

const konga = async (search,page) => {
    try {
     search = search ? search : "";
     const result = await kongaSearchQl(search,page);
     const resultJson = await result.json();
     return kongaHtml(resultJson);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }





const searchApi = async (searchTerm,page) => {
    return await shuffle([...await jumia(searchTerm,page), ...await kara(searchTerm,page), ...await payporte(searchTerm,page), ...await pointek(searchTerm,page), ...await konga(searchTerm,page)]);
}
export default searchApi;