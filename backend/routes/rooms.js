import express from 'express';
import {getAllRooms} from '../controllers/rooms.js';

export const router = express.Router();

router.get('/', getAllRooms);

export {router as roomsRoutes};
