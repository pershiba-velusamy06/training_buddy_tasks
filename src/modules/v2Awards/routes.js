import express from 'express';
import { v2AwardsHelper } from '../routeConstants.js'
import { handleInvalidFileTypeError, upload } from '../../middleware/v2CreateAwardsMiddleAware.js'
import { createAwardsController } from './createAwards/createAwardsController.js'

const v2awardsRoutes = express.Router();

v2awardsRoutes.post(`${v2AwardsHelper.addUserAwards}`, upload, async (req, res) => {
     
        return await createAwardsController(req, res);

});

v2awardsRoutes.use(handleInvalidFileTypeError)


export default v2awardsRoutes;