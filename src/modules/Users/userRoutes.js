import express from 'express';

import { userSignUp } from './signup/userSignUpController.js';
import { userHelpers } from '../routeConstants.js';
import { userValidation } from './signup/userSignUpDataChecker.js';


const userRoutes = express.Router();

userRoutes.post(userHelpers.userSignUp,userValidation, async (req, res) => {

  return await userSignUp(req, res);
});


export default userRoutes;