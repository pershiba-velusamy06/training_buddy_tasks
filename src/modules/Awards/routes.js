import express from 'express';
import { createAwards } from './handlers.js';
import { createAwardsValidator } from './helpers.js';

const awardsRoutes = express.Router();

awardsRoutes.post('/addUserAwards', createAwardsValidator, async (req, res) => {

    return await createAwards(req, res);
});


export default awardsRoutes;