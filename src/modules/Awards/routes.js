import express from 'express';
import { deleteAwards, updateAwards, viewAllAwardsOfUser } from './handlers.js';
import {  deleteAwardsValidator, fetchallAwardsValidator, updateAwardsValidator } from './helpers.js';
import { AwardsHelper } from '../routeConstants.js'
import { createAwardsController } from './createAwards/createAwardsController.js';
import { awardsAuthMiddleware } from '../../middleware/awardsAuthMiddleware.js';
const awardsRoutes = express.Router();

awardsRoutes.post(AwardsHelper.addUserAwards, awardsAuthMiddleware, async (req, res) => {

    return await createAwardsController(req, res);
});
awardsRoutes.patch(AwardsHelper.editUserAwards, updateAwardsValidator, async (req, res) => {

    return await updateAwards(req, res);
});
awardsRoutes.post(AwardsHelper.viewUserAwards, fetchallAwardsValidator, async (req, res) => {

    return await viewAllAwardsOfUser(req, res);
});

awardsRoutes.delete(AwardsHelper.deleteUserAwards, deleteAwardsValidator, async (req, res) => {

    return await deleteAwards(req, res);
});

export default awardsRoutes;