import express from 'express';
import { v2AwardsHelper } from '../routeConstants.js'
import {upload} from '../../middleware/v2CreateAwardsMiddleAware.js'
import {createAwardsController} from './createAwards/createAwardsController.js'

const v2awardsRoutes = express.Router();

v2awardsRoutes.post(`${v2AwardsHelper.addUserAwards}`,upload.single('awardCertificateURL'), async (req, res) => {
    return await createAwardsController(req, res);
});


export default v2awardsRoutes;