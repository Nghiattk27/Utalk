import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
require('dotenv').config();
import { createJWT, verifyToken } from './middleware/JWTAction';

let app = express();

const corsConfig = {
    origin: true,
    credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(express.static(path.join(__dirname, 'public')));

initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8081;


app.listen(port, () => {
    console.log("server running on port : " + port)
})
