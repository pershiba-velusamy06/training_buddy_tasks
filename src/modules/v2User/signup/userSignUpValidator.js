import userInfo from "../../../modals/UserSchema.js";


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

            const existingUser = await userInfo.findOneAndUpdate(
                { phoneNumber: data.phoneNumber },
                { otp: data.otp },
                { new: true, upsert: true }
            );

            resolve(existingUser);
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


