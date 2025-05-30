import express from 'express'
import {controllermethod } from '../controllers/method.controller.js';


const modelRouter = express.Router();

modelRouter.post('/url',controllermethod);


export default modelRouter;