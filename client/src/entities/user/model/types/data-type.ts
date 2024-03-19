import { ErrorType } from "./error-type";

export interface DataType {
	message: string,
	errors: ErrorType[]
}