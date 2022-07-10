import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';
require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: true }))

initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8081;


app.listen(port, () => {
    console.log("server running on port : " + port)
})
