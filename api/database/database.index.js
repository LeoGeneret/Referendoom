const Sequelize = require("sequelize")

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: "mysql",
        // logging: false
    }
)

/**
 * Entities
 */

const ProposalEntity = sequelize.import("./Entity/ProposalEntity")
const ProposalTagEntity = sequelize.import("./Entity/ProposalTagEntity")
const ProposalVoteEntity = sequelize.import("./Entity/ProposalVoteEntity")
const UserEntity = sequelize.import("./Entity/UserEntity")


sequelize.entities = {
    ProposalEntity,
    ProposalTagEntity,
    ProposalVoteEntity,
    UserEntity,
}

/**
 * Relations
 */

// Proposal <-> Tag
ProposalTagEntity.hasMany(ProposalEntity, {as: "proposals", foreignKey: "tag_id", onDelete: "SET NULL"})
ProposalEntity.belongsTo(ProposalTagEntity, {as: "tag", foreignKey: "tag_id"})

// Proposal <-> User
UserEntity.hasMany(ProposalEntity, {as: "proposals", foreignKey: "author_id", onDelete: "CASCADE"})
ProposalEntity.belongsTo(UserEntity, {as: "author", foreignKey: "author_id"})

// User <-> Vote
UserEntity.hasMany(ProposalVoteEntity, {as: "users_in_favor", foreignKey: "user_id", onDelete: "CASCADE"})
ProposalEntity.hasMany(ProposalVoteEntity, {as: "votes", foreignKey: "proposal_id", onDelete: "CASCADE"})

module.exports = sequelize