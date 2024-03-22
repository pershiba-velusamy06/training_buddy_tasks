import express from 'express';
import { v2AwardsHelper } from '../routeConstants.js'
import { handleInvalidFileTypeError, upload } from '../../middleware/v2CreateAwardsMiddleAware.js'
import { createAwardsController } from './createAwards/createAwardsController.js'
import { userSpecificAwardsController } from './userSpecificAwards/userSpecificAwardsController.js'
import { userSpecificAwardsMiddleware } from '../../middleware/userSpecificAwardsMiddleware.js';
const v2awardsRoutes = express.Router();

v2awardsRoutes.post(`${v2AwardsHelper.addUserAwards}`, upload, async (req, res) => {

        return await createAwardsController(req, res);

});
v2awardsRoutes.use(handleInvalidFileTypeError)
v2awardsRoutes.post(v2AwardsHelper.viewUserAwards, userSpecificAwardsMiddleware, async (req, res) => {
        return await userSpecificAwardsController(req, res);
});




export default v2awardsRoutes;