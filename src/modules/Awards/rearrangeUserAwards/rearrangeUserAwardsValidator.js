import Awards from "../../../modals/AwardsSchema.js"

export const rearrangeUserAwardsValidator = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let AwardsList = await Awards.findOneAndUpdate({ _id: data.awardId }, data, { new: true })

            if (AwardsList) {
                const responseObject = {
                    awardId: AwardsList._id,
                    awardTitle: AwardsList.awardTitle,
                    description: AwardsList.description,
                    issuedBy: AwardsList.issuedBy,
                    issuedDate: AwardsList.issuedDate,
                    approvalStatus: AwardsList.approvalStatus,
                    pinStatus: AwardsList.pinStatus,
                    pinSequence: AwardsList.pinSequence
                };
                resolve(responseObject)
            } else {
                resolve(null)
            }
        } catch (error) {
            reject(error)
        }
    })

}