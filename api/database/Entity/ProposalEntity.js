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

    // Entities

    const ProposalVoteEntity = sequelize.import("./ProposalVoteEntity")

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

    ProposalEntity.setVote = async (proposalId, isAgree, user_id) => {

        proposalId = Number(proposalId)

        if(EntityUtils.validation.isEmptyOrNull(user_id) || !EntityUtils.validation.isBoolean(isAgree) || !Number.isInteger(user_id)){
            return {
                error: {
                    message: "BAD REQUEST - one parameter is invalid",
                    message_details: {
                        proposalId: proposalId, 
                        isAgree : isAgree, 
                        user_id: user_id
                    },
                    status: 400
                }
            }
        }

        try {

            const proposal = await ProposalEntity.findByPk(proposalId, {
                attributes: ["id"],
                include: [
                    {
                        association: "votes",
                        attributes: ["id"],
                        required: false,
                        where: {
                            user_id: user_id
                        }
                    }
                ]
            })

            // proposal do not exists
            if(!proposal){
                return {
                    error: {
                        message: "NOT FOUND - proposal do not exist",
                        status: 404
                    }
                }
            } else {

                // user has already vote for this proposal
                if(proposal.get("votes").length && proposal.get("votes")[0]){
                    console.log("a")
                    const modifiedVote = await proposal.get("votes")[0].update({
                        is_agree: isAgree
                    })
                    
                    return {
                        is_agree: modifiedVote.get("is_agree")
                    }
                } 
                // user has never vote for this proposal
                else {
                    console.log({proposalId, user_id, ProposalVoteEntity})

                    const createdVote = await ProposalVoteEntity.createVote({
                        user_id: user_id,
                        proposal_id: proposalId,
                        is_agree: isAgree,
                    })

                    return {
                        is_agree: createdVote.get("is_agree")
                    }                    
                }
            }
            
        } catch (SetVoteError) {
            console.log({SetVoteError})
            return {
                error: {
                    message: "BAD REQUEST - unhandled error occured",
                    status: 400
                }
            }
        }
    }

    ProposalEntity.createProposal = async (authorId, title, description, tagId) => {

        // validate input

        if(!Number.isInteger(authorId) || EntityUtils.validation.isEmptyOrNull(title) || EntityUtils.validation.isEmptyOrNull(description)){
            return {
                error: {
                    message: "BAD REQUEST - one parameter is invalid",
                    message_details: {
                        authorId: authorId,
                        title: title,
                        description: description,
                    },
                    status: 400
                }
            }
        }

        try {
            
            const createdProposal = await ProposalEntity.create({
                title: title,
                description: description,
                tag_id: tagId,
                author_id: authorId,
                created_at: new Date()
            })

            return "created"

        } catch (CreateProposalError) {
            console.log({CreateProposalError})
            return {
                error: {
                    message: "BAD REQUEST - unhandled error occured",
                    status: 400
                }
            }
        }

    }

    ProposalEntity.deleteProposal = async (proposalId, self_id) => {


        if(!Number.isInteger(proposalId) || !Number.isInteger(self_id)){
            return {
                error: {
                    message: "BAD REQUEST - one parameter is invalid",
                    message_details: {
                        proposalId: proposalId, 
                        self_id: self_id
                    },
                    status: 400
                }
            }
        }

        try {
            
            const proposal = await ProposalEntity.findByPk(proposalId, {
                attributes: ["author_id", "id"]
            })

            if(proposal){

                // self is author
                if(proposal.get("author_id") === self_id){
                    const destroyedProposal = await proposal.destroy()
    
                    if(destroyedProposal){
                        return "destroyed"
                    } else {
                        // weird 
                        return {
                            error: {
                                message: "BAD REQUEST - cannot delete this proposal",
                                status: 400
                            }
                        }
                    }
                }
                // self is not author
                else {
                    return {
                        error: {
                            message: "FORBIDDEN - you are not the author",
                            status: 403
                        }
                    }
                }
    
            } 
            // this proposal do not exist
            else {
                return {
                    error: {
                        message: "NOT FOUND - proposal do not exist",
                        status: 404
                    }
                }
            }
            
        } catch (DeleteProposalError) {
            console.log({DeleteProposalError})
            return {
                error: {
                    message: "BAD REQUEST - unhandled error occured",
                    status: 400
                }
            }
        }
    }

    return ProposalEntity
}