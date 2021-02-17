import axios from 'axios';
const addToNotify = async(userId,data) => {
    const response = await axios({
        method: 'post',
        url: '/api/user/addToNotify',
        data: {
            id:userId,
            ...data
        }
    }) 
    if(response.data.message === "add-notify"){
        data.showLike = true;
        data.notify = true;
        return data;
    }else if(response.data.message === "remove-notify"){
        data.notify = false;
        return data;
    }
}

export default addToNotify;