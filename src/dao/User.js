import userInfo from "../modals/UserSchema.js";

export const findAndUpdateUser = async (data) => {
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

export const updateAwardCreationinUser = async (phoneNumber, awardId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const updateUserData = await userInfo.updateOne({ phoneNumber: phoneNumber }, { $addToSet: { awards: awardId } })
            resolve(updateUserData)

        } catch (error) {
            reject(error);
        }
    });




}