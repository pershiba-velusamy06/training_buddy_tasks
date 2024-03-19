import express from 'express';

import { userSignUp } from './userSignUp/userSignUpController.js';
import { userHelpers } from '../routeConstants.js';
import { userValidation } from '../../middleware/userValidationMiddleware.js';
//import { userValidation } from './userSignUp/userSignUpDataChecker.js';


const userRoutes = express.Router();

userRoutes.post(userHelpers.userSignUp, userValidation, async (req, res) => {

  return await userSignUp(req, res);
});


export default userRoutes;