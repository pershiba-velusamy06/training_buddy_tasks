import Award from '../../../modals/updatedAwardsSchema.js'
import userInfo from "../../../modals/UserSchema.js";
import { constructDataURL } from "../../../utils/Awards/awardsConstants.js";


export const getAllAwardsByReference = async (awards, start, offset) => {

    let startValue = start == 0 ? 1 : start

    return new Promise(async (resolve, reject) => {
        try {
            const awardsList = await Award.find({ _id: { $in: awards } }).skip(startValue - 1).limit(offset);
            console.log(awardsList[awardsList.length-1]?.awardCertificateURL,"award?.awardCertificateURL")
            const formattedAwards = await awardsList.map(award => ({
               
                awardId: award._id,
                awardTitle: award.awardTitle,
                description: award.description,
                issuedBy: award.issuedBy,
                issuedDate: award.issuedDate,
                awardCertificateURL:award?.awardCertificateURL?.data? constructDataURL(award?.awardCertificateURL?.data, award.awardCertificateURL.contentType):""

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