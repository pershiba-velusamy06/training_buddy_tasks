import jwt from 'jsonwebtoken';
import { CreateAwardsValidator, updateAwardCreationinUser } from './createAwardsValidator.js';
import { allowedFields, sendErrorResponse } from '../../../utils/Awards/awardsConstants.js';
export const createAwardsDataCheckers = async (req, res) => {

    try {
        const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
        if (extraFields.length > 0) {
            const errorMessage = `Invalid or extra parameters: ${extraFields.join(', ')}.`;
            // return sendErrorResponse(res, errorMessage)
            return errorMessage
        }
        for (const field of allowedFields) {
            if (!req.body[field]) {
                return `${field} is missing.`
                // return sendErrorResponse(res, `${field} is missing.`)
            }
            if (typeof req.body[field] !== 'string') {
                return `${field} should be a string.`
                // return sendErrorResponse(res, `${field} should be a string.`)
            }
        }
        let auth = req.headers.authorization;
        const decoded = jwt.verify(auth, "elred");
        let phoneNumber = decoded.phoneNumber;
        let bodyData = { ...req.body, approvalStatus: "accepted" }
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


