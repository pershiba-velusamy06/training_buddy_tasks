import express from 'express';
import { createAwards, deleteAwards, updateAwards, viewAllAwardsOfUser } from './handlers.js';
import { createAwardsValidator, deleteAwardsValidator, fetchallAwardsValidator, updateAwardsValidator } from './helpers.js';

const awardsRoutes = express.Router();

awardsRoutes.post('/addUserAwards', createAwardsValidator, async (req, res) => {

    return await createAwards(req, res);
});
awardsRoutes.patch('/editUserAwards', updateAwardsValidator, async (req, res) => {

    return await updateAwards(req, res);
});
awardsRoutes.post('/viewUserAwards',fetchallAwardsValidator, async (req, res) => {

    return await viewAllAwardsOfUser(req, res);
});

awardsRoutes.delete('/deleteUserAwards',deleteAwardsValidator, async (req, res) => {

    return await deleteAwards(req, res);
});

export default awardsRoutes;