import jwt from 'jsonwebtoken';
import { CreateAwardsValidator, updateAwardCreationinUser } from './createAwardsValidator.js';
export const createAwardsDataCheckers = async (req, res) => {

    try {
        let bearerAuth = req.headers.authorization
        let auth = bearerAuth.replace("Bearer ", "");
        const decoded = jwt.verify(auth, "elred");
        let phoneNumber = decoded.phoneNumber;
        let bodyData = { ...req.body, approvalStatus: "accepted",pinStatus:"unpinned" ,pinSequence:0}
        let Award = await CreateAwardsValidator(bodyData)
        if (Award) {
            await updateAwardCreationinUser(phoneNumber, Award.awardId)
            return [Award]
        } else {
            return []
        }

    } catch (err) {
     
        throw Error('Internal server Error')
    }


}


