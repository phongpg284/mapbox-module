const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const port = 4000;

var db;
const app = express();
app.use(express.static("src"));

// MongoClient.connect("mongodb://localhost:27017/mapbox", function (err, db) {
//   if (err) throw new Error(err);
//   db = db;
// });

app.listen(port, () => console.log(`Connect success port ${port}`));
