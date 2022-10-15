const express = require('express')
const call = require("./routes/call")
const app = express()
app.use(express.json())
app.use("/call", call)

app.get("/", (req, res ) => {
    return res.send("Welcome to this API !!")
})
app.use(function (req, res) {
    res.status(404).send("Route doesn't exist!")
})
const port = process.env.PORT || 3000;
app.listen(port, _ => { console.log(`Listening on port ${port}`) });   