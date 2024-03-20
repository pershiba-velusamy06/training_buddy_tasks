
import { userSignUpValidator, userUpdateOtpValidator, userbyEmailforSignUpValidator } from "./userSignUpValidator.js";
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail'
import 'dotenv/config'
const SENDGRID = process.env.SENDGRID;
sgMail.setApiKey(SENDGRID);

export const userSignUpDataChecker = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await userSignUpValidator(req.body)
            if (User) {
                const otp = Math.floor(100000 + Math.random() * 900000);

                const msg = {
                    to: User.email,
                    from: 'pershiba@elred.io', 
                    templateId: 'd-d406ec55b7294702bda55ba3d9a33b91', // Replace this with your dynamic template ID
                    dynamicTemplateData: {
                        otp: otp
                    },
                     subject: 'Sign up request',
                    // text: `Your OTP is ${otp}`,
                    // html: `<strong>Your OTP is ${otp}</strong>`
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