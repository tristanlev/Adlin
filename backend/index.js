import express from 'express';
import bodyParser from 'body-parser';
import {roomsRoutes} from './routes/rooms.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/rooms', roomsRoutes);

export const httpServer = app.listen(process.env.PORT || 3001, () => {
    console.log('Http server listening on port 3001')
 });