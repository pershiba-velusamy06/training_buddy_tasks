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
            const user = await userInfo.findById(userId)
            resolve(user)
        } catch (error) {
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