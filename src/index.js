import express from "express";
import mongoose from "mongoose";
import router from "./route";
import cors from "cors";

const port = 4000;
const dbUrl= "mongodb://localhost:27017/mapbox"

const app = express();

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) throw err
    console.log(`Connect successfully to ${dbUrl}`)
})

const allowedOrigins = ['http://localhost:3000',"file:///C:/Users/tpw28/Desktop/Code/mapbox-module/react-mapbox/build/index.html#/"];

const options = {
    origin: allowedOrigins
};
app.use(cors(options));
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))

app.use("/api", router);

app.listen(port, () => console.log(`Connect success port ${port}`));
