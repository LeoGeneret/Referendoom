
const TMP_SELF_USER_ID = 1

module.exports = (sequelize, express) => {

    /** Dependencies */
    const router = express.Router()


    /** Routes */

    router.get("/proposals", async (req, res) => {

        // query
        const userId = req.query.user_id && Number(req.query.user_id)
        const offset = req.query.offset && Number(req.query.offset)
        const limit = req.query.limit && Number(req.query.limit)

        const results = await sequelize.entities.ProposalEntity.getAll(limit, offset, TMP_SELF_USER_ID, userId)

        if(results.error){
            return res.status(results.error.status).json(results)
        }

        return res.json(results)
    })

    router.get("/proposals/:id", async (req, res) => {

        // Params
        const proposalId = (req.params.id && Number(req.params.id)) || null

        const results = await sequelize.entities.ProposalEntity.getOne(proposalId, TMP_SELF_USER_ID)

        if(results.error){
            return res.status(results.error.status).json(results)
        }

        return res.json(results)
    })

    router.patch("/proposals/:id/vote", async (req, res) => {

        // params
        const proposalId = req.params.id

        // body
        const isAgree = req.body && req.body.is_agree

        const results = await sequelize.entities.ProposalEntity.setVote(proposalId, isAgree, TMP_SELF_USER_ID)

        if(results.error){
            return res.status(results.error.status).json(results)
        }

        return res.json(results)
    })

    router.post("/proposals", async (req, res) => {

        // body
        const title = req.body && req.body.title
        const description = req.body && req.body.description
        const tagId = req.body && req.body.tag_id

        const results = await sequelize.entities.ProposalEntity.createProposal(
            TMP_SELF_USER_ID,
            title,
            description,
            tagId
        )

        if(results.error){
            return res.status(results.error.status).json(results)
        } 
        // has been created
        else {
            return res.status(201).json(results)
        }
    })

    return router
}