import express from 'express';
import bodyParser from 'body-parser';
import {router} from './routes/rooms.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use('/api/rooms', router);

export const httpServer = app.listen(process.env.PORT || 3001, () => {
    console.log('Http server listening on port 3001')
 });