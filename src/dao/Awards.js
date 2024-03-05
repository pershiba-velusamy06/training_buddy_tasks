import Awards from '../modals/AwardsSchema.js';
import userInfo from '../modals/UserSchema.js';

export const CreateAwards = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            const newAward = await Awards.create(data)

            const responseObject = {
                awardId: newAward._id,
                awardTitle: newAward.awardTitle,
                description: newAward.description,
                issuedBy: newAward.issuedBy,
                issuedDate: newAward.issuedDate,
                approvalStatus: newAward.approvalStatus
            };
            resolve(responseObject)
        } catch (error) {
            reject(error)
        }
    })
}

export const updateAwardsDao = async (awardId, data) => {
    return new Promise(async (resolve, reject) => {
        try {

            const updatedAwards = await Awards.findOneAndUpdate({ _id: awardId }, data, { new: true })
            const responseObject = {
                awardId: updatedAwards._id,
                awardTitle: updatedAwards.awardTitle,
                description: updatedAwards.description,
                issuedBy: updatedAwards.issuedBy,
                issuedDate: updatedAwards.issuedDate,
                approvalStatus: updatedAwards.approvalStatus
            };
            resolve(responseObject)
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllAwardsByReference = async (awards,start,offset) => {
   
    let startValue= start===0?1:start
    return new Promise(async (resolve, reject) => {
        try {
            const awardsList = await Awards.find({_id:{$in:awards}}).skip(startValue    -1).limit(offset);
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


