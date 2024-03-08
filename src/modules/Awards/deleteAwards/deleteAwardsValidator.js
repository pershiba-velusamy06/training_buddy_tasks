import Awards from "../../../modals/AwardsSchema.js";
import userInfo from "../../../modals/UserSchema.js";



export const deleteAwardsDao = async (awardIds) => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const deleteResult = await Awards.deleteMany({ _id: { $in: awardIds } });
            resolve(deleteResult);
        } catch (error) {
            reject(error);
        }
    });
}

export const findAwardsExsistingUser = async (phoneNumber, awards) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userInfo.findOne({ phoneNumber: phoneNumber })
            console.log(user,"user")
            if (!user) {
                resolve(false)
            } else {
                const nonExistingAwards = awards.filter(award => !user.awards.includes(award));
                if (nonExistingAwards.length > 0) {
                    resolve(false)
                } else {
                    resolve(true);
                }

            }


        } catch (error) {
            reject(error)
        }

    })
}


export const removeAwardsFromUser=(phoneNumber,awards)=>{
    return new Promise (async(resolve, reject)=>{
        try {
            const user = await userInfo.findOneAndUpdate(
                { phoneNumber: phoneNumber },
                { $pull: { awards: { $in: awards } } },
                { new: true } 
            );
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })

}