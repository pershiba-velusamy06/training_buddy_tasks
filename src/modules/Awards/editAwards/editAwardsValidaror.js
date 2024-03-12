import Awards from "../../../modals/AwardsSchema.js";
import userInfo from "../../../modals/UserSchema.js";


export const editAwardsValidator = async (awardId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedAwards = await Awards.findOneAndUpdate({ _id: awardId }, data, { new: true })
            if(updatedAwards){
                const responseObject = {
                    awardId: updatedAwards._id,
                    awardTitle: updatedAwards.awardTitle,
                    description: updatedAwards.description,
                    issuedBy: updatedAwards.issuedBy,
                    issuedDate: updatedAwards.issuedDate,
                    approvalStatus: updatedAwards.approvalStatus,
                    pinStatus:updatedAwards.pinStatus ,
                    pinSequence:updatedAwards.pinSequence
                };
                resolve(responseObject)
            }else{
                resolve(null)
            }
          
        } catch (error) {
            reject(error)
        }
    })
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
