import fs from 'fs';

export async function getAllRooms(req, res) {
    try {
        console.log("trying to get all rooms");
        fs.readFile('salles.json', (err, data) => {
            if (err) throw err;
            let rooms = JSON.parse(data);
            console.log(rooms);
            res.status(200).json({
                rooms: rooms
            })
        })
        
    } catch (err) {
        console.log(err);
    }
}