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
