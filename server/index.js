import express, { Router } from "express";
import Connection from "./database/db.js";
import router from "./route/route.js";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running successfully at ${PORT}`);
})

Connection();