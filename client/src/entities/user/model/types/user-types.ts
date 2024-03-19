import { BasketResponse } from "app/models/response/BasketResponse";
import { IUser } from "app/models/response/IUser";
import { ErrorType } from "./error-type";
import { DataType } from "./data-type";

export interface User {
	isAuth: boolean,
	user: IUser,
	error: DataType,
}
