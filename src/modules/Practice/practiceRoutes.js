import express from 'express';
import { PracticeHelper } from '../routeConstants.js';
import { practiceAsyncControllers } from './Async/practiceAsyncControllers.js';
import { createAnExcelController, readAnExcelController } from './xlsx/CreateAnExcelController.js';


const practiceRoutes = express.Router();

practiceRoutes.get(PracticeHelper.practiceAsync, async (req, res) => {

    return await practiceAsyncControllers(req, res)

});

practiceRoutes.get(PracticeHelper.createExcel, async (req, res) => {
    return await createAnExcelController(req, res)
})

practiceRoutes.get(PracticeHelper.readAnExcel, async (req, res) => {
    return await readAnExcelController(req, res)
})


export default practiceRoutes;