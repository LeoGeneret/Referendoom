module.exports = (sequelize, DataTypes) => {

    const UserEntity = sequelize.define("user", {

        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },


        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    }, {
        createdAt: false,
        updatedAt: false
    })

    return UserEntity
}