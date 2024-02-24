import $api from 'app/http'
import { IUser } from 'app/models/response/IUser'
import { AxiosResponse } from 'axios'

export default class UserService {
	static getUsers(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>('/users')
	}
}