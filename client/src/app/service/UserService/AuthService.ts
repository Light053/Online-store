import $api from "app/http";
import { AuthResponse } from "app/models/response/AuthResponse";
import { AxiosResponse } from 'axios'

export default class AuthService {
	static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/login', { username, password })
	}
	static async registration(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/registration', { username, password })
	}
	static async logout(): Promise<void> {
		return $api.post('/logout')
	}
}