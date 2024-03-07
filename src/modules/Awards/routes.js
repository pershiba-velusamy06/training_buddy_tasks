import express from 'express';
import { createAwards, deleteAwards, updateAwards, viewAllAwardsOfUser } from './handlers.js';
import { createAwardsValidator, deleteAwardsValidator, fetchallAwardsValidator, updateAwardsValidator } from './helpers.js';
import { AwardsHelper } from '../routeConstants.js'
const awardsRoutes = express.Router();

awardsRoutes.post(AwardsHelper.addUserAwards, createAwardsValidator, async (req, res) => {

    return await createAwards(req, res);
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