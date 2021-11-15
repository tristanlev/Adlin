import express from 'express';
import { getAllRooms } from '../controllers/rooms/search/allRooms.js';
import { getSpecificRooms } from '../controllers/rooms/search/specificRooms.js';
import { bookRoom } from '../controllers/rooms/book/bookRoom.js';
import { updateRoomStatus } from '../controllers/rooms/utils/utils.js';

export const router = express.Router();

router.get('/', updateRoomStatus, getAllRooms);
router.post('/', updateRoomStatus, bookRoom);
router.post('/search', updateRoomStatus, getSpecificRooms);