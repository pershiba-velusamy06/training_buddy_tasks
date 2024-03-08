import Awards from '../modals/AwardsSchema.js';


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


