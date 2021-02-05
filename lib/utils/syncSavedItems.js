import { getSession } from "next-auth/client";


const syncSavedItems = async(product) => {
    const session =  await getSession();
    console.log(session)
    // const savedItems = session.user.savedItems.length ? [...session.user.savedItems] : false;
    // if(savedItems){
    //      const newProduct = savedItems.find(item => item.itemUrl === product.itemUrl);
    //      return newProduct ? newProduct : product;
    // }else{
    //     return product;
    // }
return product;
}

export default syncSavedItems;