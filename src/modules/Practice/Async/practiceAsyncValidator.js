import Awards from "../../../modals/AwardsSchema.js";
import userInfo from "../../../modals/UserSchema.js";
import async from 'async';
import _ from 'lodash'
export const getAllAwards = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const fetchAwardsData = await Awards.find()
            let filteredArray = await _.filter(fetchAwardsData, (list) => {
                return list._id.toString() === "65eefbaeb43a554aafd2c894"
            })
            resolve(filteredArray)
        } catch (error) {
            reject(error);
        }
    });

}
export const getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const fetchAwardsData = await userInfo.find()
            resolve(fetchAwardsData)
        } catch (error) {
            reject(error);
        }
    });

}

export const fetchSomeArray = async () => {

    return new Promise(async (resolve, reject) => {
        try {
            const fetchAwardsData = []
            let idsList = ['65eefbaeb43a554aafd2c894', '65eefc18b43a554aafd2c89c', '65eefc1cb43a554aafd2c89f'];
            async.forEachLimit(idsList, 2, async (value, index, callback) => {
               
                const data = await Awards.findOne({ _id: value })
                fetchAwardsData.push(data)
                resolve(fetchAwardsData)

            })
        } catch (error) {
            reject(error);
        }
    });
}
