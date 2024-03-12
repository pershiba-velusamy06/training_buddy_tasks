import express from 'express';
import { AwardsHelper } from '../routeConstants.js'
import { createAwardsController } from './createAwards/createAwardsController.js';
import { awardsAuthMiddleware, awardsAuthWithUsercodeMiddleWare } from '../../middleware/awardsAuthMiddleware.js';
import { editAwardsController } from './editAwards/editAwardsController.js';
import { userSpecificAwardsController } from './userSpecificAwards/userSpecificAwardsController.js';
import { deleteAwardsControllers } from './deleteAwards/deleteAwardsControllers.js';
import { rearrangeUserAwardsControllers } from './rearrangeUserAwards/rearrangeUserAwardsControllers.js';
const awardsRoutes = express.Router();

awardsRoutes.post(AwardsHelper.addUserAwards, awardsAuthMiddleware, async (req, res, next) => {
    return await createAwardsController(req, res, next);
});
awardsRoutes.patch(AwardsHelper.editUserAwards, awardsAuthMiddleware, async (req, res, next) => {
    return await editAwardsController(req, res, next);
});
awardsRoutes.post(AwardsHelper.viewUserAwards, awardsAuthWithUsercodeMiddleWare, async (req, res) => {
    return await userSpecificAwardsController(req, res);
});

awardsRoutes.delete(AwardsHelper.deleteUserAwards, awardsAuthMiddleware, async (req, res) => {
    return await deleteAwardsControllers(req, res);
});

awardsRoutes.patch('/rearrangeUserAwards', awardsAuthMiddleware, async (req, res) => {
    return await rearrangeUserAwardsControllers(req, res)
})

export default awardsRoutes;