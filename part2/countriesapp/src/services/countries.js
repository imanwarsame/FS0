import axios from "axios";
const baseURL = 'https://restcountries.com/v3.1/all'

const getAll = () => {
    console.log(baseURL)
    return axios.get(baseURL)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll}