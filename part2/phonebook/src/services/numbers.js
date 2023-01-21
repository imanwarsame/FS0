import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL)
}
  
const create = newObject => {
    return axios.post(baseURL, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
}

const deleteOne = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, update, deleteOne}