
import { allowedFieldsForEditAwards, sendErrorResponse } from "../../../utils/Awards/awardsConstants.js";
import { editAwardsValidator, findUser } from "./editAwardsValidaror.js";
import jwt from 'jsonwebtoken';

export async function editAwardsDataCheckers(req, res, next) {
    try {
        let bearerAuth = req.headers.authorization
        let auth = bearerAuth.replace("Bearer ", "");
        const decoded = jwt.verify(auth, "elred");
        let phoneNumber = decoded.phoneNumber
        let user = await findUser(phoneNumber, req.body.awardId)

        if (user) {
            const reqObject = {
                _id: req.body.awardId,
                awardTitle: req.body.awardTitle,
                description: req.body.description,
                issuedBy: req.body.issuedBy,
                issuedDate: req.body.issuedDate,
                approvalStatus: req.body.approvalStatus,
                pinStatus: req.body.pinStatus,
                pinSequence: req.body.pinSequence
            };

            let updateAwardsDetail = await editAwardsValidator(req.body.awardId, reqObject)
            if (updateAwardsDetail) {
                return [updateAwardsDetail]
            } else {
                return []
            }

        } else {
            return null
        }
        
    } catch (err) {
        throw Error('Internal server Error')
    }

}