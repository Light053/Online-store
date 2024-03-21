import { LoginResponse } from "./LoginResponse";

export interface IUser {
	username: {
		username: string,
		password: string,
		roles: [],
		basket: {
			items: [],
			totalPrice: 0
		}
	},

	id: string
}