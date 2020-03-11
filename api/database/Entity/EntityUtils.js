
const DEFAULT_LIMIT = 5
const DEFAULT_OFFSET = 0


const EntityUtils = {

    getSingleItem: async (id, Entity, queryParameter = {}, {errorMessage = "no match for id " + id}) => {
        try {

            const singleItem = await Entity.findByPk(id, queryParameter)

            if(singleItem){
                return singleItem
            } else {
                return {
                    error: {
                        message: "NOT FOUND - " + errorMessage,
                        status: 404
                    }
                }
            } 
        } catch (GetSingleItemError) {
            console.log({GetSingleItemError})
            return {
                error: {
                    message: "BAD REQUEST - Unhandled error occured",
                    status: 400
                }
            }
        }
    },

    getPaginatedList: async (limit, offset, Entity, queryParameter = {}, countQueryParameter = null) => {
        try {
            const modelList = await Entity.findAll({
                limit: limit,
                offset: offset * limit,
                ...queryParameter,
            })

            const modelCount = await Entity.count(countQueryParameter || queryParameter)

            return {
                pagination: {
                    count: modelCount,
                    offset_count: Math.ceil(modelCount / limit),
                    offset: offset,
                    limit: limit,
                },
                list: modelList
            }

        } catch (GetPaginatedListError) {
            console.log({GetPaginatedListError})
            return {
                error: {
                    message: "BAD REQUEST - Unhandled error occured",
                    status: 400
                }
            }
        }
    },


    validation: {
        isEmptyOrNull: string => !string || string === "",
        isBoolean : bool => bool === true || bool === false
    }

}

module.exports = EntityUtils