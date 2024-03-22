

import { errorMessages, successMessage } from '../../../utils/users/userConstant.js';
import { VerifyOtpChecker } from './verifyOtpDataChecker.js';

export async function verifyOtp(req, res) {

    try {
        await VerifyOtpChecker(req, res).then((response) => {
            if (response) {
                if (response === "Otp expired") {
                    return res.send({
                        statusCode: 500, result: [], success: true,
                        isAuth: false, message: response
                    });
                }
                res.status(200).send({
                    Result: response,
                    success: true,
                    isAuth: false,
                    message: 'User verified SuccessFully',
                });
            } else {
                res.send({
                    statusCode: 500, result: [], success: true,
                    isAuth: false, message: 'invalid otp user not verified.'
                });
            }

        }).catch((error) => {
            res.send({ statusCode: 500, result: [], status: 'Failure', message: errorMessages.internalServerError });
        })

    } catch (err) {
        res.send({ statusCode: 500, result: [], status: 'Failure', message: errorMessages.internalServerError });
    }
}

