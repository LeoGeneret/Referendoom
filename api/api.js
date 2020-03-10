// console.clear()

// Fetch env variables
require("dotenv").config()

// Modules
const express = require("express")
const app = express()

const sequelize = require("./database/database.index")

// Parameters
const PORT = process.env.PORT || 4001

// App
app.use(express.json())

// Routes

const proposalRouter = require("./routes/api.routes.proposal")(sequelize, express)
app.use(proposalRouter)

app.get("/", async (req, res) => {
    return res.json("ok")
})

app.listen(PORT, () => console.log("API running on port " + PORT))