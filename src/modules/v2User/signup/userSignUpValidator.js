import client from "../../../index.js";
import userInfo from "../../../modals/UserSchema.js";
import { setRedisData } from "../../../utils/redisFunctions.js";


export const userSignUpValidator = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {

            const existingUser = await userInfo.findOneAndUpdate(
                { phoneNumber: data.phoneNumber },
                data,
                { new: true, upsert: true }
            );

            resolve(existingUser);
        } catch (error) {
            reject(error);
        }
    });
}
export const userUpdateOtpValidator = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {

            // const existingUser = await userInfo.findOneAndUpdate(
            //     { phoneNumber: data.phoneNumber },
            //     { otp: data.otp },
            //     { new: true, upsert: true }
            // );
            await setRedisData(data.phoneNumber, data.otp)
            // client.set(data.phoneNumber,data.otp,'EX', 300)

            resolve(true);


        } catch (error) {
            reject(error);
        }
    });
}




export const userbyEmailforSignUpValidator = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {

            const existingUser = await userInfo.findOne(
                { email: data },

            );

            resolve(existingUser);
        } catch (error) {
            reject(error);
        }
    });
}


