const EntityUtils = require("./EntityUtils")

const Format = {
    attributes : {
        attributes: {
            exclude: ["tag_id", "author_id"]
        },
        include: [
            {
                association: "tag"
            },
            {
                association: "author",
                attributes: ["id", "first_name", "last_name"]
            },
            {
                association: "votes"
            }
        ]
    },

    output: (proposalsItems, self_id) => {

        const votes = proposalsItems.get("votes")
        const votes_count = votes.length
        const is_agree_count = votes.filter(f => f.get("is_agree")).length

        const is_agree_percent = is_agree_count / votes_count
        const is_not_agree_percent = 1 - is_agree_percent

        return {
            ...proposalsItems.get(),
            user_is_in_favor: !!votes.find(v => v.user_id === self_id),
            votes: {
                count: votes_count,
                is_agree: Math.floor(is_agree_percent * 100) / 100,
                is_not_agree: Math.floor(is_not_agree_percent * 100) / 100,
            }
        }
    }
}

module.exports = (sequelize, DataTypes) => {

    const ProposalEntity = sequelize.define("proposal", {

        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        illustration: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    
    }, {
        createdAt: "created_at",
        updatedAt: false
    })


    // Fetchers

    ProposalEntity.getAll = async (limit = 5, offset = 0, self_id, user_id = null) => {

        const filter = user_id ? {
            where: {
                author_id: user_id
            }
        } : {}

        const proposals = await EntityUtils.getPaginatedList(
            limit, 
            offset, 
            ProposalEntity, 
            {
                ...filter,
                ...Format.attributes,
            },
            filter
        )

        if(!proposals.error){
            proposals.list = proposals.list.map(p => Format.output(p, self_id))
        }  

        return proposals
    }

    ProposalEntity.getOne = async (proposalId, self_id) => {

        const proposal = await EntityUtils.getSingleItem(proposalId, ProposalEntity, Format.attributes, {
            errorMessage: "no proposal found"
        })

        if(!proposal.error){
            return Format.output(proposal, self_id)
        } else {
            return proposal
        }
    }

    ProposalEntity.setVote = async () => {



    }

    return ProposalEntity
}