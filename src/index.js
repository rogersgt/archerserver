import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routers/main.router';
import secure from './middleware/secure';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(secure);

const port = process.env.PORT || '8080';
app.listen(port, onStart);

function onStart() {
    console.log(`Listening on port: ${port}`);
}

app.use('/api', router);
