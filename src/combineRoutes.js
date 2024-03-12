import express from 'express';
import userRoutes from './modules/Users/userRoutes.js'; 
import awardsRoutes from './modules/Awards/routes.js';
import practiceRoutes from './modules/Practice/practiceRoutes.js';


const rootRouter = express.Router();

rootRouter.use('/',userRoutes);
rootRouter.use('/',awardsRoutes);
rootRouter.use('/',practiceRoutes)
export default rootRouter;
