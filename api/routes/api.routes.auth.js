
module.exports = (sequelize, express) => {

    /** Dependencies */
    const router = express.Router()


    /** Routes */
    
    router.post("/auth/signin", async (req, res) => {

        // body
        const login = req.body.login || null
        const password = req.body.password || null

        const results = await sequelize.entities.UserEntity.signin(login, password)
        
        if(results.error){
            return res.status(results.error.status).json(results)
        }

        return res.json(results)
    })

    return router
}