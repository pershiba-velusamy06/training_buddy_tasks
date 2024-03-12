
import { allowedFieldsForEditAwards, sendErrorResponse } from "../../../utils/Awards/awardsConstants.js";
import { editAwardsValidator, findUser } from "./editAwardsValidaror.js";
import jwt from 'jsonwebtoken';

export async function editAwardsDataCheckers(req, res, next) {
    try {
        const extraFields = Object.keys(req.body).filter(field => !allowedFieldsForEditAwards.includes(field));
        if (extraFields.length > 0) {
            const errorMessage = `Invalid or extra parameters: ${extraFields.join(', ')}.`;
            return errorMessage
        }
        for (const field of allowedFieldsForEditAwards) {
            console.log(typeof req.body[field], "req.body[field]")
            if (!req.body[field]) {
                return `${field} is missing.`
            }
            if (typeof req.body[field] !== 'number' && field === "pinSequence") {
                return `${field} should be a number..`
            }
            if (typeof req.body[field] !== 'string' && field !== "pinSequence") {
                return `${field} should be a string..`
            }

            if (field === 'issuedDate') {
                const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
                if (!dateRegex.test(req.body[field])) {
                    return `Invalid format for ${field}. It should be in the format dd/mm/yyyy.`
                }
            }
        }
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

