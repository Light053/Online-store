import axios from "axios";

export const API_AUTH_URL = 'http://localhost:5000/auth'
export const API_PRODUCTS_URL = 'http://localhost:5000/products'

const $api = axios.create({
	withCredentials: true,
	baseURL: API_AUTH_URL
});

export const $apiProducts = axios.create({
	withCredentials: true,
	baseURL: API_PRODUCTS_URL
})

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default $api