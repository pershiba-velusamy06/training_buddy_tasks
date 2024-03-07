import express from 'express';
import { createUser } from './handlers.js';
import { userValidation } from './helpers.js';
import { userHelpers } from '../routeConstants.js'

const userRoutes = express.Router();

userRoutes.post(userHelpers.userSignUp, userValidation, async (req, res) => {

  return await createUser(req, res);
});


export default userRoutes;