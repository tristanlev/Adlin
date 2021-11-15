import {isRoomFreeForSlot, getDatesFromStrings} from '../utils/utils.js'

function shouldRemoveRoomFromCapacityFilter(capacity, room, index) {
    let numericalCapacity = parseInt(capacity, 10);

    if (typeof capacity == 'undefined' || isNaN(numericalCapacity))
        return false;
    if (numericalCapacity > room.capacity)
        return true
    return false;
}

function shouldRemoveRoomFromDateFilter(beginDateParam, endDateParam, room) {
    let dates = null;

    if (beginDateParam === '' && endDateParam === '')
        return false;
    dates = getDatesFromStrings(beginDateParam, endDateParam);
    if (isRoomFreeForSlot(room, dates.startDate, dates.endDate))
        return false;
    return true;
}

function shouldRemoveRoomFromEquipmentsFilter(equipments, room) {
    let occurences = 0;
    
    if (typeof equipments != 'object' || !equipments.length)
        return false;
    for (let i = 0; i < equipments.length; i++) {
        occurences = 0;
        for (let j = 0; j < room.equipements.length; j++) {
            if (room.equipements[j].name === equipments[i])
                occurences += 1;
        }
        if (!occurences)
            return (true);
    }
    return false;
}

function removeRoomsFromFilters(filters, rooms) {
    for (let i = 0; i < rooms.length; i++) {
        if (shouldRemoveRoomFromCapacityFilter(filters.capacity, rooms[i]) || 
            shouldRemoveRoomFromDateFilter(filters.beginDate, filters.endDate, rooms[i]) ||
            shouldRemoveRoomFromEquipmentsFilter(filters.equipments, rooms[i])) {
                rooms.splice(i, 1);
                i--;
        }
    }
}

export function getSpecificRooms(req, res) {
    try {
        removeRoomsFromFilters(req.body, res.locals.data.rooms);
        res.status(200).json({
            rooms: res.locals.data.rooms
        });
    } catch(err) {
        console.log(err.message);
        res.status(400).json({
            err: err.message
        });
    }
}