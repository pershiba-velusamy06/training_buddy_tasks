
import userInfo from "../../../modals/UserSchema.js";
import Award from "../../../modals/updatedAwardsSchema.js";

export const CreateAwardsValidator = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newAward = await Award.create(data)
          
            if(newAward){
                const responseObject = {
                    awardId: newAward._id,
                    awardTitle: newAward.awardTitle,
                    description: newAward.description,
                    issuedBy: newAward.issuedBy,
                    issuedDate: newAward.issuedDate,
                    approvalStatus: newAward.approvalStatus,
                    pinStatus:newAward.pinStatus ,
                    pinSequence:newAward.pinSequence,
                    awardCertificateURL:newAward.awardCertificateURL
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


export const updateAwardCreationinUser = async (phoneNumber, awardId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateUserData = await userInfo.updateOne(
                { phoneNumber: phoneNumber },
                { $addToSet: { awards: awardId } })
            resolve(updateUserData)
        } catch (error) {
            reject(error);
        }
    });

}