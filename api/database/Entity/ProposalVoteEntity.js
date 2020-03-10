module.exports = (sequelize, DataTypes) => {

    const ProposalVoteEntity = sequelize.define("proposal_vote", {

        is_agree: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

    }, {
        createdAt: false,
        updatedAt: false
    })


    ProposalVoteEntity.createVote = async (parameters = {}) => {
        return ProposalVoteEntity.create(parameters)
    }

    return ProposalVoteEntity
}