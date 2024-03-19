import express from 'express';

;
import { userHelpers } from '../routeConstants.js';
import { userValidation } from '../../middleware/userValidationMiddleware.js';
//import { userValidation } from './userSignUp/userSignUpDataChecker.js';
import {userSignUp} from './signup/userSignUpController.js'
import { verifyOtp } from './validateotp/verifyOtpController.js';

const v2userRoutes = express.Router();

v2userRoutes.post(userHelpers.userSignUp, userValidation, async (req, res) => {

  return await userSignUp(req, res);
});
v2userRoutes.post(userHelpers.verifyOtp, async (req, res) => {

  return await verifyOtp(req, res);
});


export default v2userRoutes;