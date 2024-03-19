
import { userSignUpValidator, userbyEmailforSignUpValidator } from "./userSignUpValidator.js";
import jwt from 'jsonwebtoken';

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