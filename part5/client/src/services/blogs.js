import axios from 'axios';
const baseURL = '/api/blogs';

let token = null;

const setToken = newToken => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseURL);
	return request.then(response => response.data);
};

const create = async newObject => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseURL, newObject, config);
	return response.data;
};

const update = (id, newObject) => {
	const request = axios.put(`${ baseURL }/${id}`, newObject);
	return request.then(response => response.data);
};

const deleteOne = (id) => {
	return axios.delete(`${baseURL}/${id}`);
};

export default { getAll, create, update, setToken, deleteOne };