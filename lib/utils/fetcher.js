import axios from 'axios'

const fetcher = async (url) => {
    return await axios({
        method: 'post',
        url,
        data: {
            secret:"hello",
        }
    }); 
};
export default fetcher;