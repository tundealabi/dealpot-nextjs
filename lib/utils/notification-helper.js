import axios from 'axios';

const userReadNotification = async (userId) => {
    return await axios({
        method: 'post',
        url: '/api/user/manageNotification',
        data: {
            id:userId,
            type: "resetnotification"
        }
    });
};

const clearAllNotification = async (userId) => {
    return await axios({
        method: 'post',
        url: '/api/user/manageNotification',
        data: {
            id:userId,
            type: "clearallnotification"
        }
    });
};

export { userReadNotification, clearAllNotification };