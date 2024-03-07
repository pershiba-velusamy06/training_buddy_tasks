import express from 'express';
import userRoutes from './modules/Users/userRoutes.js'; 
import awardsRoutes from './modules/Awards/routes.js';


const rootRouter = express.Router();

rootRouter.use('/',userRoutes);
rootRouter.use('/',awardsRoutes);

export default rootRouter;
