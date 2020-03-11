
// Fetch env variables
require("dotenv").config()


/**
 * 
 * 
 * 
 */

 const MODE = process.env.NODE_ENV
 if(MODE === "development"){
    console.clear()
 }

// Utils
const utils = require("./api.utils")

// Modules
const logger = require("morgan")
const express = require("express")
const app = express()

const sequelize = require("./database/database.index")

// Parameters
const PORT = process.env.PORT || 4001

// App
app.use(logger(MODE === "development" ? "dev" : "tiny"))
app.use(express.json())

app.use(utils.extractToken)

// Routes

const proposalRouter = require("./routes/api.routes.proposal")(sequelize, express)
app.use(utils.needAuthentication, proposalRouter)

const authRouter = require("./routes/api.routes.auth")(sequelize, express)
app.use(authRouter)

app.get("/", async (req, res) => {
    return res.json("ok")
})

app.listen(PORT, () => console.log("API running on port " + PORT))