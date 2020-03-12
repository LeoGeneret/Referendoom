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


    // Fetchers

    ProposalTagEntity.getAll = async () => {
        return ProposalTagEntity.findAll({
            
        })
    }

    return ProposalTagEntity
}