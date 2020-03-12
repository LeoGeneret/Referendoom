
const devMode = true

const TAGS_COLORS = {
    1: "#F2994A",
    2: "#2F80ED",
    3: "#EB5757",
    4: "#F2C94C",
    5: "#27AE60",
}

export default {

    API_HOST: devMode ? "http://192.168.43.220:4000" : "http://ec2-35-181-9-37.eu-west-3.compute.amazonaws.com:4000",

    getTagColors: id => TAGS_COLORS[id] || "#000" 

}