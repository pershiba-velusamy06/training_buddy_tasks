import jwt from 'jsonwebtoken';
import { CreateAwardsValidator, updateAwardCreationinUser } from './createAwardsValidator.js';
import { allowedFields, sendErrorResponse } from '../../../utils/Awards/awardsConstants.js';
export const createAwardsDataCheckers = async (req, res) => {

    try {
        const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
        if (extraFields.length > 0) {
            const errorMessage = `Invalid or extra parameters: ${extraFields.join(', ')}.`;
            return errorMessage
        }
        for (const field of allowedFields) {
            if (!req.body[field]) {
                return `${field} is missing.`
            }
            if (typeof req.body[field] !== 'string') {
                return `${field} should be a string.`
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


