import Awards from '../modals/AwardsSchema.js';

export const CreateAwards=async(data)=>{
return new Promise(async(resolve,reject)=>{
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