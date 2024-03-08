import { finduserById, getAllAwardsByReference } from "./userSpecificAwardsValidator.js";

export const userSpecificAwardsDataChecker = async (req, res) => {
    try {

        const allowedParams = ['start', 'offset'];
        const extraParams = Object.keys(req.query).filter(key => !allowedParams.includes(key));
        if (extraParams.length > 0) {
            const errorMessage = `Extra query parameters found: ${extraParams.join(', ')}.`;
            return errorMessage

        }
        const { start, offset } = req.query;
        const usercode = req.body.usercode;
        let user = await finduserById(usercode)
        if (user) {
            console.log(user)
            const awardsList = await getAllAwardsByReference(user.awards, start, offset)
            return [{
                count: user.awards.length,
                awardsList: awardsList
            }]

        } else {
            return [{
                count: 0,
                awardsList: []
            }]

        }
    } catch (error) {
        
        throw Error('Internal server Error')
    }




}