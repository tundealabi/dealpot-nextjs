import numberFormat from "./numberFormat";
import { formatProductName } from "./stringFormatter";

const jumiaHtml = ($) => {
    let data = [];
    $(".c-prd").each((i,el)=>{
        //console.log(i)
        if($(el).find(".info .name").text().length > 3){
          const obj = {
            vendor:"Jumia",
            itemName: formatProductName($(el).find(".info .name").text()),
            itemImage:$(el).find(".img-c .img").attr("data-src"),
            itemPrice:$(el).find(".info .prc").text(),
            itemUrl:`https://www.jumia.com.ng${$(el).find(".core").attr("href")}`,
        }
        data.push(obj);
        }
    });
      return data;
}

const pointekHtml = ($) => {
    let data = [];
  $("li.type-product").each((i,el)=>{
    //console.log(i)
    if($(el).find("div.product-body > a > h2").text().length > 2){
      const obj = {
        vendor: "Pointek online",
        itemName: formatProductName($(el).find("div.product-body > a > h2").text()),
        itemImage: $(el).find("div.product-header > a > img").attr("src") || $(el).find("div.product-header > p > a > img").attr("src"),
        itemPrice: $(el).find("div.product-body > a > span > span").text() || $(el).find("div.product-body > p > a > span > span").text(),
        itemUrl: $(el).find("div.product-header > a").attr("href"),
    }
    data.push(obj);
    }
});
  return data;
}

const karaHtml = ($) => {
    const data = [];
    $("li.product-item").each((i,el)=>{
      if($(el).find("div > div > strong > a").text().length > 2){
        const obj = {
          vendor:"Kara",
          itemName: formatProductName($(el).find("div > div > strong > a").text()),
          itemImage: $(el).find("div > a > span > span > img").attr("data-original"),
          itemPrice: $(el).find(".product-item .price-box > span:nth-child(1) .price").text(),
          itemUrl: $(el).find("div > div > strong > a").attr("href"),
      }
      data.push(obj);
      }
  });
  return data;
}

const payporteHtml = ($) => {
    let data = [];
    $("li.product-item").each((i,el)=>{
        //console.log(i)
        if($(el).find("div > div.product.details.product-item-details > h2 > a").text().length > 2){
          const obj = {
            vendor:"Payporte",
            itemName: formatProductName($(el).find("div > div.product.details.product-item-details > h2 > a").text()),
            itemImage: $(el).find("div > div.product_image > a > span > span > img").attr("data-original"),
            itemPrice: $(el).find("span .price").text(),
            itemUrl: `${$(el).find("div > div.product.details.product-item-details > h2 > a").attr("href")}`,
        }
        data.push(obj);
        }
    });
    return data;
}

const kongaHtml = (productData) => {
    return productData.data.searchByStore.products.map(product=>{
        return {
                  vendor:"Konga",
                  itemName: formatProductName(product.name),
                  itemImage: `https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product${product.image_thumbnail}`,
                  itemPrice: numberFormat(product.special_price || product.price),
                  itemUrl: `https://www.konga.com/product/${product.url_key}`,
                  sku: product.sku
        }
    });
}

export {jumiaHtml, pointekHtml, karaHtml, payporteHtml, kongaHtml};