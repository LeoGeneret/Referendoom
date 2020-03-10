module.exports = (sequelize, DataTypes) => {

    const ProposalTagEntity = sequelize.define("proposal_tag", {

        label: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    }, {
        createdAt: false,
        updatedAt: false
    })

    return ProposalTagEntity
}