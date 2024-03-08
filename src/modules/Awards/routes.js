import express from 'express';
import { deleteAwards, viewAllAwardsOfUser } from './handlers.js';
import {  deleteAwardsValidator, fetchallAwardsValidator,  } from './helpers.js';
import { AwardsHelper } from '../routeConstants.js'
import { createAwardsController } from './createAwards/createAwardsController.js';
import { awardsAuthMiddleware } from '../../middleware/awardsAuthMiddleware.js';
import { editAwardsController } from './editAwards/editAwardsController.js';
const awardsRoutes = express.Router();

awardsRoutes.post(AwardsHelper.addUserAwards, awardsAuthMiddleware, async (req, res,next) => {

    return await createAwardsController(req, res,next);
});
awardsRoutes.patch(AwardsHelper.editUserAwards, awardsAuthMiddleware, async (req, res,next) => {

    return await editAwardsController(req, res,next);
});
awardsRoutes.post(AwardsHelper.viewUserAwards, fetchallAwardsValidator, async (req, res) => {

    return await viewAllAwardsOfUser(req, res);
});

awardsRoutes.delete(AwardsHelper.deleteUserAwards, deleteAwardsValidator, async (req, res) => {

    return await deleteAwards(req, res);
});

export default awardsRoutes;