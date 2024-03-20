import userInfo from "../../../modals/UserSchema.js";



export const FetchOtp = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {

            const getUser = await userInfo.findOne({ phoneNumber: data.phoneNumber });
            if (getUser) {
                const { email, firstName, lastName, phoneNumber, otp,_id } = getUser;

             
                const userData = {
                    email,
                    firstName,
                    lastName,
                    phoneNumber,
                    otp,
                    _id
                };
                resolve(userData)
            }
        } catch (error) {
            reject(error);
        }
    });

}


export const userSignUpValidator = async (data) => {

    return new Promise(async (resolve, reject) => {
        console.log(data,"data")
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


// export const userbyEmailforSignUpValidator = async (data) => {

//     return new Promise(async (resolve, reject) => {
//         try {

//             const existingUser = await userInfo.findOne(
//                 { email: data },

//             );

//             resolve(existingUser);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }
