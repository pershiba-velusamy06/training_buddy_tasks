
import { userSignUpValidator, userbyEmailforSignUpValidator } from "./userSignUpValidator.js";
import jwt from 'jsonwebtoken';
import { allowedFields, sendErrorResponse, validations } from "../../../utils/users/userConstant.js";
import userInfo from "../../../modals/UserSchema.js";
export const userSignUpDataChecker = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {

            const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, 'elred', { expiresIn: '10d' });
            let expiryTime = Date.now() + (10 * 24 * 60 * 60 * 1000);
            let body = { ...req.body, accessToken: token, expiryTime: expiryTime.toString() }
            let User = await userSignUpValidator(body)

            let userData = [{
                accessToken: token,
                expiryTime: expiryTime.toString(),
                email: User.email,
                phoneNumber: User.phoneNumber
            }];
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

export const userValidation = async (req, res, next) => {
    const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (extraFields.length > 0) {
        const errorMessage = `Invalid or extra parameters: ${extraFields.join(', ')}.`;
        return sendErrorResponse(res, errorMessage)
    }
    for (const field of allowedFields) {
        if (!req.body[field]) {
            return sendErrorResponse(res, `${field} is missing.`)
        }

        if (typeof req.body[field] !== 'string') {
            return sendErrorResponse(res, `${field} should be a string.`)
        }

        const validationError = validations[field](req.body[field]);
        if (validationError) {
            return sendErrorResponse(res, validationError)
        }
    }
    const existingUser = await userbyEmailforSignUpValidator(req.body.email);
   
    if (existingUser && existingUser.phoneNumber !== req.body.phoneNumber) {
        return sendErrorResponse(res, 'This email is already in use with another phone number. Please enter the correct phone and email combination.');
    }
    next()
}