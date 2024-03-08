import userInfo from "../modals/UserSchema.js";

export const findUser = async (phoneNumber, awardId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const user = await userInfo.findOne({ phoneNumber: phoneNumber })
            resolve(user)
            if (!user) {
                resolve(null)
            } else {
                const awardExists = user.awards.includes(awardId);
                if (awardExists) {
                    resolve(user)
                } else {
                    resolve(null)
                }
            }

        } catch (error) {
            reject(error);
        }
    });

}

export const finduserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userInfo.findOne({_id:userId})
            if(user){
                console.log(user,"user>>>>")
                resolve(user)
            }else{
                console.log(user,"null user")
                resolve(null)
            }
          
        } catch (error) {
            console.log(error)
            reject(error)
        }

    })
}


export const findAwardsExsistinUser = async (phoneNumber, awards) => {
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