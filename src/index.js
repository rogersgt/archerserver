import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routers/main.router';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || '8080';

app.listen(port, onStart);

function onStart() {
    console.log(`Listening on port: ${port}`);
}

app.use('/api', router);
