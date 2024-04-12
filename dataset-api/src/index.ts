import express from "express";
import cors from "cors";
import authRoutes from './routes/auth'
import datasetsRoutes from './routes/datasets'

import {APP_PORT, MONGO_CLUSTER_URI} from "./config";
import {connectToCluster} from "./database";
import {ErrorHandler} from "./helpers/error.handler";

const app = express()
const port = APP_PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/auth', authRoutes);
app.use('/datasets', datasetsRoutes);

if (MONGO_CLUSTER_URI) {
    void connectToCluster(MONGO_CLUSTER_URI)
}

// app.use(ErrorHandler)

app.listen(port, ()=> console.log(`App listening on port ${port}!`))