
import { getReditData } from "../../../utils/redisFunctions.js";
import { FetchOtp, userSignUpValidator } from "./verifyOtpValidator.js";
import jwt from 'jsonwebtoken';


export const VerifyOtpChecker = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {

            let otpValue = await getReditData(req.body.phoneNumber)
            if (otpValue) {
                let FetchOtpData = await FetchOtp(req.body)
                if (otpValue === req.body.otp) {
                    const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, 'elred', { expiresIn: '10d' });
                    let expiryTime = Date.now() + (10 * 24 * 60 * 60 * 1000);
                    let body = { ...FetchOtpData, accessToken: token, expiryTime: expiryTime.toString() }
                    let User = await userSignUpValidator(body)

                    let userData = [{
                        accessToken: token,
                        expiryTime: expiryTime.toString(),
                        email: User.email,
                        phoneNumber: User.phoneNumber,
                        userCode: User._id
                    }];
                    resolve(userData)
                } else {
                    resolve(null)
                }

            }


        } catch (error) {
          
            reject(error)
        }
    })
}