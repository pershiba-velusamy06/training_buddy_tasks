import client from '../index.js'
import redis from 'redis'


export const setRedisData = async (key, data) => {
 
    await client.set(key, data, redis.print);
    await client.expire(key, 5*60);

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