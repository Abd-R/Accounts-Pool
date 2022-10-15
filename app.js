const express = require('express')
const call = require("./routes/call")
const app = express()
app.use(express.json())
app.use("/call", call)

const port = process.env.PORT || 3000;
app.listen(port, _ => { console.log(`Listening on port ${port}`) });   