import express from 'express';
import { createAwards, updateAwards, viewAllAwardsOfUser } from './handlers.js';
import { createAwardsValidator, fetchallAwardsValidator, updateAwardsValidator } from './helpers.js';

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




export default awardsRoutes;