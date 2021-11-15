export async function getAllRooms(req, res) {
    try {
        res.status(200).json({
            rooms: res.locals.data.rooms
        })
    } catch (err) {
        console.log(err);
    }
}