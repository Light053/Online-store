import { IUser } from "app/models/response/IUser"

export interface ReviewType {
	user: IUser,
	username: string
	text: string,
	rating: number,
	createdAt: Date
}