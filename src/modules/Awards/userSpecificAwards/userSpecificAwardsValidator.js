import Awards from "../../../modals/AwardsSchema.js";
import userInfo from "../../../modals/UserSchema.js";


export const getAllAwardsByReference = async (awards, start, offset) => {

    let startValue = start === 0 ? 1 : start
    return new Promise(async (resolve, reject) => {
        try {
            const awardsList = await Awards.find({ _id: { $in: awards } }).skip(startValue - 1).limit(offset);
           
            const formattedAwards = awardsList.map(award => ({
                awardId: award._id,
                awardTitle: award.awardTitle,
                description: award.description,
                issuedBy: award.issuedBy,
                issuedDate: award.issuedDate,
                approvalStatus: award.approvalStatus
            }));

            resolve(formattedAwards);
        } catch (error) {
            reject(error)
        }
    })
}

export const finduserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userInfo.findOne({ _id: userId })
            if (user) {
               
                resolve(user)
            } else {
                
                resolve(null)
            }

        } catch (error) {
         
            reject(error)
        }

    })
}