import userInfo from "../../../modals/UserSchema.js";


export const userSignUpValidator = async (data) => {
    console.log(data, "data")
    return new Promise(async (resolve, reject) => {
        try {

            const existingUser = await userInfo.findOneAndUpdate(
                { phoneNumber: data.phoneNumber },
                data,
                { new: true, upsert: true }
            );
            console.log(existingUser, "existingUser")
            resolve(existingUser);
        } catch (error) {
            reject(error);
        }
    });
}
