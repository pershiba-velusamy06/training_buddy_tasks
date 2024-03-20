import client from '../index.js'



export const setRedisData = (key, data) => {
    client.set(key, data);
}

export const getReditData = (key) => {

    return client.get(key, (err, value) => {
        if (err) {
            console.error('Error getting key:', err);
            return;
        }
       
        return value
    });

}


export const deleteKey = (key) => {
    return client.del(key, (error, response) => {
        if (error) {
            console.error('Error deleting key:', error);
        } else {
         
            return true
        }
    });
}