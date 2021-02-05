import axios from 'axios';
import cheerio from 'cheerio';
import { kongaSearchQl } from './utils/kongaGraphQl';
import shuffleData from './utils/shuffleData';
import { jumiaHtml, kongaHtml, karaHtml, pointekHtml, payporteHtml } from './utils/traverseDom';

const searchTerms = ["cloth", "phone", "headphone", "bag", "shoe","perfume"];

let firstRandNumb = Math.floor(Math.random() * searchTerms.length);
let secondRandNumb = Math.floor(Math.random() * searchTerms.length);

const firstTerm = searchTerms[firstRandNumb];
const secondTerm = searchTerms[secondRandNumb];

const jumia = async () => {
    try {
        const response = await axios.get(`https://www.jumia.com.ng/catalog/?q=${firstTerm}&page=${firstRandNumb ? firstRandNumb : 1}`);
        let $ = cheerio.load(response.data);
        return jumiaHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

const kara = async () => {
    try {
        let response = await axios.get(`https://www.kara.com.ng/catalogsearch/result/index/?p=${secondRandNumb ? secondRandNumb : 1}&q=${secondTerm}`);
        let $ = cheerio.load(response.data);
            return karaHtml($);
    } catch (error) {
        console.log(error.message)
        return [];
    }
}

const pointek = async () => {
    try {
            const response = await axios.get(`https://www.pointekonline.com/page/${firstRandNumb ? firstRandNumb : 1}/?s=${secondTerm}&post_type=product`);
            let $ = cheerio.load(response.data);
            return pointekHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

const payporte = async () => {
    try {
        let response = await axios.get(`https://payporte.com/new-arrivals.html?p=${firstRandNumb ? firstRandNumb : 1}`);
        let $ = cheerio.load(response.data);
            return payporteHtml($);
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

const konga = async () => { 
    try {
        const result = await kongaSearchQl(secondTerm,secondRandNumb);
        const resultJson = await result.json();
        return kongaHtml(resultJson);
       } catch (error) {
         console.log(error.message);
         return [];
       }
}

const homepageData = {
    newDeals:[
        {
            vendor: "Jumia",
            itemName: "Drilled Swan Watch Lady Qua...",
            itemPrice: "₦ 1,390",
            itemImage: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/163893/1.jpg?2047",
            itemUrl: "https://www.jumia.com.ng/fashion-drilled-swan-watch-lady-quartz-watch-39836131.html",
            notify: false,
            showLike: false

        },
        {
            vendor: "Kara",
            itemName: "Sony 55 Inch 4k Uhd Hdr Sma...",
            itemPrice: "₦395,600.00",
            itemImage: "https://www.kara.com.ng/pub/media/catalog/product/cache/17c7a29bc3b866f12190fe8cb108de52/s/o/sony_55_inch_4k_uhd_hdr_smart_tv_-_kd-55x8000g.jpg",
            itemUrl: "https://www.kara.com.ng/sony-55-inch-4k-uhd-hdr-smart-tv-kd-55x8000g",
            notify: false,
            showLike: false
        },
        {
            vendor: "Payporte",
            itemName: "Deep Plunge Neck Bodysuit",
            itemPrice: "₦7,500.00",
            itemImage: "https://payporte.com/pub/media/catalog/product/cache/729962302c12c364cab61afdfc6b9547/s/i/side_stripe_light_wash_denim_short_8000_deep_plunge_neck_bodysuit_7500_4__1.jpg",
            itemUrl: "https://payporte.com/deep-plunge-neck-bodysuit.html",
            notify: false,
            showLike: false
        },
        {
            vendor: "Konga",
            itemName: "Unisex Sneakers - White",
            itemPrice: "₦7,500",
            itemImage: "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/K/L/162847_1609155962.jpg",
            itemUrl: "https://www.konga.com/product/unisex-sneakers-white-5060916",
            notify: false,
            showLike: false
        }
    ],
    popularDeals:[
        {
            vendor: "Jumia",
            itemName: "Scanfrost Cooker",
            itemPrice: "₦ 54,340",
            itemImage: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/09/88835/1.jpg?9340",
            itemUrl: "https://www.jumia.com.ng/scanfrost-cooker-sfc5402sb-black-5388890.html",
            notify: false,
            showLike: false
        },
        {
            vendor: "Pointek",
            itemName: "Apple Iphone 12 64GB",
            itemPrice: "₦512,840.00",
            itemImage: "https://www.pointekonline.com/wp-content/uploads/2020/10/iphone-12-200x200.png",
            itemUrl: "https://www.pointekonline.com/product/apple-iphone-12-64gb/",
            notify: false,
            showLike: false
        },
        {
            vendor: "Payporte",
            itemName: "uper Stretch Skinny Jean",
            itemPrice: "₦10,000.00",
            itemImage: "https://payporte.com/pub/media/catalog/product/cache/729962302c12c364cab61afdfc6b9547/3/x/3x4a2612_copy_2.jpg",
            itemUrl: "https://payporte.com/super-stretch-skinny-jean.html",
            notify: false,
            showLike: false
        },
        {
            vendor: "Konga",
            itemName: "Sony PlayStation 5 Digital ...",
            itemPrice: "₦470,000",
            itemImage: "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/K/E/63606_1604765917.jpg",
            itemUrl: "https://www.konga.com/product/sony-playstation-5-digital-edition-ps5-white-console-5012094",
            notify: false,
            showLike: false
        },
        {
            vendor: "Testweb",
            itemName: "Headphone 1",
            itemPrice: "NGN 100,000",
            itemImage: "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/A/U/83451_1589193655.jpg",
            itemUrl: "https://dealpot-test-web.netlify.app/headphone1.html",
            notify: false,
            showLike: false
        },
        {
            vendor: "Testweb",
            itemName: "Headphone 3",
            itemPrice: "NGN 250,000",
            itemImage: "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/T/P/120659_1605010817.jpg",
            itemUrl: "https://dealpot-test-web.netlify.app/headphone3.html",
            notify: false,
            showLike: false
        },
        {
            vendor: "Testweb",
            itemName: "Headphone 4",
            itemPrice: "NGN 300,000",
            itemImage: "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/Q/D/154242_1602969509.jpg",
            itemUrl: "https://dealpot-test-web.netlify.app/headphone4.html",
            notify: false,
            showLike: false
        },
    ]
}

const homepageDataApi = async () => {
    return await shuffleData([...await jumia(), ...await kara(), ...await pointek(), ...await payporte(), ...await konga()]);
}

export default homepageDataApi;