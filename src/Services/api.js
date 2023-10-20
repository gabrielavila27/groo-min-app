import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.funtranslations.com/translate'
})

export default api