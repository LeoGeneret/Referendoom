import axios from 'axios'
import params from './app.params'

const TMP_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgzOTUyNzI5LCJleHAiOjE1OTI1OTI3Mjl9.wn-s5O9xgvsY2zomdqs1yP3gbyrTdAOlvdOa8yUJPGw"

export default {
    
    fetch: (request, parameters) => {
        console.log("will fetch " + request)
        return axios(params.API_HOST + request, {
            ...parameters,
            headers: {
                "Authorization": "Bearer " + TMP_ACCESS_TOKEN
            }
        })
    }

}