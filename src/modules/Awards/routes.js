import express from 'express';
import { deleteAwards } from './handlers.js';
import {  deleteAwardsValidator  } from './helpers.js';
import { AwardsHelper } from '../routeConstants.js'
import { createAwardsController } from './createAwards/createAwardsController.js';
import { awardsAuthMiddleware, awardsAuthWithUsercodeMiddleWare } from '../../middleware/awardsAuthMiddleware.js';
import { editAwardsController } from './editAwards/editAwardsController.js';
import { userSpecificAwardsController } from './userSpecificAwards/userSpecificAwardsController.js';
const awardsRoutes = express.Router();

awardsRoutes.post(AwardsHelper.addUserAwards, awardsAuthMiddleware, async (req, res,next) => {

    return await createAwardsController(req, res,next);
});
awardsRoutes.patch(AwardsHelper.editUserAwards, awardsAuthMiddleware, async (req, res,next) => {

    return await editAwardsController(req, res,next);
});
awardsRoutes.post(AwardsHelper.viewUserAwards, awardsAuthWithUsercodeMiddleWare, async (req, res) => {

    return await userSpecificAwardsController(req, res);
});

awardsRoutes.delete(AwardsHelper.deleteUserAwards, deleteAwardsValidator, async (req, res) => {

    return await deleteAwards(req, res);
});

export default awardsRoutes;