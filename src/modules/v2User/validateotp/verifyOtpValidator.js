import userInfo from "../../../modals/UserSchema.js";
import { deleteKey } from "../../../utils/redisFunctions.js";



export const FetchOtp = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {

            const getUser = await userInfo.findOne({ phoneNumber: data.phoneNumber });
            if (getUser) {
              
                const { email, firstname, lastname, phoneNumber, otp, _id } = getUser;


                const userData = {
                    email,
                    firstname,
                    lastname,
                    phoneNumber,
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
       
        try {

            const existingUser = await userInfo.findOneAndUpdate(
                { phoneNumber: data.phoneNumber },
                data,
                { new: true, upsert: true }
            );
            let deleted = await deleteKey(data.phoneNumber)
            
            if (deleted) {
                resolve(existingUser);
            }

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
