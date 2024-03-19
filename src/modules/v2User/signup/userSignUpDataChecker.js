
import { userSignUpValidator, userUpdateOtpValidator, userbyEmailforSignUpValidator } from "./userSignUpValidator.js";
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail'
sgMail.setApiKey('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');

export const userSignUpDataChecker = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await userSignUpValidator(req.body)
            if (User) {
                const otp = Math.floor(100000 + Math.random() * 900000);

                const msg = {
                    to: User.email,
                    from: 'pershiba@elred.io', 
                    subject: 'Sending with Twilio SendGrid is Fun',
                    text: `Your OTP is ${otp}`,
                    html: `<strong>Your OTP is ${otp}</strong>`
                };
                sgMail
                    .send(msg)
                    .then(async () => {
                        let updateOTP = await userUpdateOtpValidator({ phoneNumber: User.phoneNumber, otp: otp })
                        if (updateOTP) {
                            let userData = [{
                                email: User.email,
                                phoneNumber: User.phoneNumber
                            }];
                            setTimeout(()=>{
                                userUpdateOtpValidator({ phoneNumber: User.phoneNumber, otp: "" })
                            },5*60*1000)
                            resolve(userData)
                        } else {
                            resolve(null)
                        }

                    })
                    .catch((error) => {
                        reject(error)
                    });


            }

        } catch (error) {
            reject(error)
        }
    })
}