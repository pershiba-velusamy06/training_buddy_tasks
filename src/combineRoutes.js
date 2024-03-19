import express from 'express';
import userRoutes from './modules/Users/userRoutes.js'; 
import awardsRoutes from './modules/Awards/routes.js';
import practiceRoutes from './modules/Practice/practiceRoutes.js';
import v2awardsRoutes from './modules/v2Awards/routes.js';


const rootRouter = express.Router();

rootRouter.use('/',userRoutes);
rootRouter.use('/',awardsRoutes);
rootRouter.use('/',practiceRoutes)
rootRouter.use('/v2',v2awardsRoutes)
export default rootRouter;
