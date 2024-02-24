import { IUser } from "app/models/response/IUser";

export interface User {
	isAuth: boolean,
	user: IUser,
	error: string
}
