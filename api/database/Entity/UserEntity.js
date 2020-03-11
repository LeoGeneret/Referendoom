const EntityUtils = require("./EntityUtils")
// const bcrypt = require("bcryptjs")
const utils = require("../../api.utils")


const ACCESS_TOKEN_EXPIRE_IN = "6h"

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

    // Fetchers

    UserEntity.signin = async (login, password) => {
        
        if(EntityUtils.validation.isEmptyOrNull(login) || EntityUtils.validation.isEmptyOrNull(password)){
            return {
                error: {
                    message: "BAD REQUEST - one parameter is invalid",
                    message_details: {
                        login: login, 
                        password : password, 
                    },
                    status: 400
                }
            }
        }
        
        try {
            
            const user = await UserEntity.findOne({
                attributes: ["id", "login", "password"],
                where: {
                    login: login,
                    password: password
                }
            })

            // user authentified
            if(user){
                
                const accessToken = utils.signToken({
                    id: user.get("id"),
                }, process.env.JWT_SECRET, {
                    expiresIn: ACCESS_TOKEN_EXPIRE_IN
                })

                // token has been successfully created
                if(accessToken){
                    return accessToken
                }
            } else {
                return {
                    error: {
                        message: "UNAUTHORIZED - access denied",
                        status: 401
                    }
                }
            }

            return {
                error: {
                    message: "BAD REQUEST - unhandled error occured",
                    status: 400
                }
            }

        } catch (SigninError) {
            console.log({SigninError})
            return {
                error: {
                    message: "BAD REQUEST - unhandled error occured",
                    status: 400
                }
            }
        }

    }

    return UserEntity
}