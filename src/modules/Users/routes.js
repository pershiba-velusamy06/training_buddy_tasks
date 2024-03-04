import express from 'express';
import { createUser } from './handlers.js';
import { userValidation } from './helpers.js';


const userRoutes = express.Router();

userRoutes.post('/userSignUp',userValidation, async (req, res) => {
   
  return await createUser(req, res);
});


export default userRoutes;