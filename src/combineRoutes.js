import express from 'express';
import userRoutes from './modules/Users/routes.js'; 


const rootRouter = express.Router();

rootRouter.use('/',userRoutes);

export default rootRouter;
