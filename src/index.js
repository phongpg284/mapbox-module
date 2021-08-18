const express = require("express")
const port = 4000;
const app = express()

app.use(express.static("src"))

app.listen(port, () => console.log(`Connect success port ${port}`))