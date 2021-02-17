import axios from 'axios';
const addToFav = async(userId,data) => {
    const response = await axios({
        method: 'post',
        url: '/api/user/addToWishlist',
        data: {
            id:userId,
            ...data
        }
    }) 
    if(response.data.message === "add-wishlist"){
        data.showLike = true;
        return data;
    }else if(response.data.message === "remove-wishlist"){
        data.showLike = false;
        return data;
    }
}

export default addToFav;