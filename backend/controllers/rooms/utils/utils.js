import fs from 'fs';
import { start } from 'repl';

export function saveUpdates(data) {
    fs.writeFile('salles.json', JSON.stringify(data, null, 2), function (err) {
        if (err)
            throw err;
        console.log('Fichier mis à jour !');
    })
}

function deleteExpiredReservations(room) {
        let     endDate = null;
        let     updatedFile = false;

    for (let i = 0; i < room.reservationDates.length; i++) {
        endDate = new Date(room.reservationDates[i].endDate).getTime();
        if (endDate < new Date().getTime()) {
            room.reservationDates.splice(i, 1);
            updatedFile = true;
            i--;
        }
    }
    return updatedFile;
}

export async function updateRoomStatus(req, res, next) {
    try {
        let     updatedFile = false;
        let     data = fs.readFileSync('salles.json');
        let     parsedData = JSON.parse(data);

        parsedData.rooms.forEach(room => {
            if (typeof room.reservationDates === "undefined") {
                room.reservationDates = [];
                updatedFile = true;
            }
            updatedFile = (deleteExpiredReservations(room)) ? true : updatedFile;
        })
        if (updatedFile)
            saveUpdates(parsedData);
        res.locals.data = parsedData;
        next();
    } catch (err) {
        console.log(err);
    }
}

export function    isRoomFreeForSlot(room, rsvStartDate, rsvEndDate) {
    rsvStartDate = rsvStartDate.getTime();
    rsvEndDate = rsvEndDate.getTime();
    let roomRsvStartDate = null;
    let roomRsvEndDate = null;

    for (let i = 0; i < room.reservationDates.length; i++) {
        roomRsvStartDate = new Date(room.reservationDates[i].beginDate).getTime();
        roomRsvEndDate = new Date(room.reservationDates[i].endDate).getTime();

        if (rsvStartDate >= roomRsvStartDate && rsvStartDate <= roomRsvEndDate) {
            return false;
        } else if (rsvEndDate >= roomRsvStartDate && rsvEndDate <= roomRsvEndDate) {
            return false;
        } else if (roomRsvStartDate >= rsvStartDate && roomRsvStartDate <= rsvEndDate) {
            return false;
        }
    }
    return true;
}

function convertToUsStringDate(stringDate) {
    console.log('startDate: ' + stringDate);

    let parts = stringDate.split(' ');
    let dayPart = parts[0].split('/');
    let usDate = dayPart[2] + '-' + dayPart[1] + '-' + dayPart[0] + ' ' + parts[1];
    console.log('usDate: ' + usDate);
    return usDate;
}

export function getDatesFromStrings(startDateStr, endDateStr) {
    let startDate = null;
    let endDate = null;

    if (typeof startDateStr === 'undefined' || typeof endDateStr === 'undefined')
        throw new Error("Le format de la date est invalide!");
    else if (startDateStr === '' || endDateStr === '')
        throw new Error("Le format de la date est invalide!");
    startDate = new Date(convertToUsStringDate(startDateStr));
    endDate = new Date(convertToUsStringDate(endDateStr));
    if (startDate == 'Invalid Date' || endDate == "Invalid Date")
        throw new Error("Le format de la date est invalide!");
    else if (endDate.getTime() <= new Date().getTime() || startDate.getTime() >= endDate.getTime())
        throw new Error('Le créneau doit durer au minimum 1 minute!');
    return {startDate, endDate};
}