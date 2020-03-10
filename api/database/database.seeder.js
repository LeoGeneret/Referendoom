
// Fetch env variables
require("dotenv").config()

const faker = require("faker")
const sequelize = require("./database.index")

// Utils

const Utils = {
    loop: (n, callback) => Array(n).fill(1).map(callback)
}

// Parameters

const USER_COUNT = 57
const PROPOSALS_PER_USERS_MAX = 14 
const TAGS = ["ecologie", "economie", "transport", "loisirs"]

async function seed(){

    /**
     * USERS
     */

    const users = await sequelize.entities.UserEntity.bulkCreate(Utils.loop(USER_COUNT, () => {

        let first_name = faker.name.firstName()
        let last_name = faker.name.lastName()

        return {
            first_name: first_name,
            last_name: last_name,
            login: faker.internet.email(first_name, last_name),
            password: "1234",
            avatar: faker.internet.avatar()
        }
    }))

    console.log("##########")
    console.log("users created => %i", users.length)
    console.log("##########")


    /**
     * TAGS
     */

    const tags = await sequelize.entities.ProposalTagEntity.bulkCreate(TAGS.map(label => {
        
        return {
            label: label
        }
    }))

    console.log("##########")
    console.log("tags created => %i", tags.length)
    console.log("##########")

    /**
     * PROPOSALS
     */

    let proposalCount = 0
    const unflattenedProposals = await Promise.all(
        users.map(usersItem => {

            let proposal_count = faker.random.number(PROPOSALS_PER_USERS_MAX)
    
            if(proposal_count){
                return sequelize.entities.ProposalEntity.bulkCreate(Utils.loop(proposal_count, () => {
                    proposalCount++
                    let created_at = faker.date.past(1)

                    return {
                        title: faker.lorem.sentences(1),
                        description: faker.lorem.sentences(3),
                        created_at: created_at,
                        // 50% chance to return random tags ELSE no tag
                        tag_id: Math.random() > .5 ? faker.random.arrayElement(tags).get("id") : null,
                        author_id: usersItem.get("id"),
                        illustration: Math.random() > .3 ? "https://picsum.photos/id/" + proposalCount + "/400/400" : null
                    }
                }))
            } else {
                return undefined
            }
    
        })
        // we filter undefined promises
        .filter(p => p)
    )

    const proposals = unflattenedProposals.flat(2)

    console.log("##########")
    console.log("proposals created => %i", proposals.length)
    console.log("##########")

    /**
     * VOTES
     */

    const votes = await Promise.all(
        proposals.map(proposalsItem => {

            let usersExceptAuthor = users.filter(u => u.get("id") !== proposalsItem.get("user_id"))
            let randomUsers = usersExceptAuthor.slice(0, faker.random.number(Math.round(usersExceptAuthor.length / 1.6)))

            return sequelize.entities.ProposalVoteEntity.bulkCreate(randomUsers.map(randomUsersItem => {

                return {
                    is_agree: faker.random.boolean(),
                    user_id: randomUsersItem.get("id"),
                    proposal_id: proposalsItem.get("id")
                }
            }))
    
        })
        // we filter undefined promises
        .filter(p => p)
    )

    console.log("##########")
    console.log("votes created => %i", votes.length)
    console.log("##########")

}

sequelize.sync({force: true}).then(() => {
    seed().then(() => {
        console.log("### DONE ###")
        process.exit(0)
    })
})