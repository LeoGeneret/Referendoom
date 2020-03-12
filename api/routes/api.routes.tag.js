
module.exports = (sequelize, express) => {

    /** Dependencies */
    const router = express.Router()


    /** Routes */
    
    router.get("/tags", async (req, res) => {

        const results = await sequelize.entities.ProposalTagEntity.getAll()
        
        if(results.error){
            return res.status(results.error.status).json(results)
        }

        return res.json(results)
    })

    return router
}