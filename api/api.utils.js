
const jwt = require("jsonwebtoken")

const ACCESS_TOKEN_IN_REQ = "access_token"

const Utils = {


    needAuthentication: (req, res, next) => {

        const access_token = req[ACCESS_TOKEN_IN_REQ]

        if(access_token){

            const decryptedToken = Utils.verifyToken(access_token, process.env.JWT_SECRET)

            if(decryptedToken){
                req.user = decryptedToken
                return next()
            } else {
                // but weird it should fail before (in verifyToken())
                return res.status(401).json({
                    error: {
                        message: "UNAUTHORIZED - token is invalid or has expired"
                    }
                })
            }

        } else {
            return res.status(401).json({
                error: {
                    message: "UNAUTHORIZED - you need to authentificate"
                }
            })
        }

    },

    extractToken: async (req, res, next) => {
    
        const headerAuthorization = req.header("Authorization")
        const retrievedToken = headerAuthorization ? headerAuthorization.replace("Bearer ", "") : null
        
        req[ACCESS_TOKEN_IN_REQ] = retrievedToken
        
        return next()
    },

    route: {
        
    },

    signToken: async (payload = {}, secret = null, parameters = {}) => {
        try {

            if(!secret){
                throw new Error("Signing token should specify a secret")
                return null
            } else {
                const token = jwt.sign(payload, secret, parameters)
                return token
            }

        } catch (SignTokenError) {
            console.log({SignTokenError})
            return null
        }
    },

    verifyToken: (token, secret) => {
        try {
            
            if(!secret){
                throw new Error("Verifying token should specify a secret")
                return null
            } else {
                const decryptedToken = jwt.verify(token, secret)
                return decryptedToken
            }


        } catch (VerifyTokenError) {
            console.log({VerifyTokenError})
            return null
        }

    }
}

module.exports = Utils