import { allowedParams } from "../../../utils/Awards/awardsConstants.js";
import { finduserById, getAllAwardsByReference } from "./userSpecificAwardsValidator.js";

export const userSpecificAwardsDataChecker = async (req, res) => {
    try {
        const extraParams = Object.keys(req.query).filter(key => !allowedParams.includes(key));
        if (extraParams.length > 0) {
            const errorMessage = `Extra query parameters found: ${extraParams.join(', ')}.`;
            return errorMessage

        }
        const { start, offset } = req.query;
        const usercode = req.body.usercode;
        if(usercode!==""){
            let user = await finduserById(usercode)
            if (user) {
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
        }else{
            return `usercode should not be empty string`
        }
       
    } catch (error) {

     
        throw Error('Internal server Error')
    }
}