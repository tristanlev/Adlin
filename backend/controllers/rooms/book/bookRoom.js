import { isRoomFreeForSlot, saveUpdates, getDatesFromStrings } from '../utils/utils.js';

function getRoomFromName(rooms, name) {
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].name === name) {
            return rooms[i];
        }
    }
}

export function bookRoom(req, res) {
    try {
        let dates = getDatesFromStrings(req.body.beginDate, req.body.endDate);
        let room = getRoomFromName(res.locals.data.rooms, req.body.roomId);

        if (isRoomFreeForSlot(room, dates.startDate, dates.endDate)) {
            room.reservationDates.push({
                beginDate: dates.startDate,
                endDate: dates.endDate
            })
        } else
            throw new Error("La salle est déjà reservée pour ce créneau!");
        saveUpdates(res.locals.data);
        res.status(200).json({
            message: 'Room has been reserved!'
        })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            message: err.message
        })
    }
}