import { IUser } from "./IUser";

export interface SmartphonesResponse {
	name: string;
	brand?: string;
	model?: string;
	description?: string;
	price: number;
	quantity?: number;
	category?: string;
	specifications?: { name: string; value: string }[];
	images?: string[];
	rating?: number;
	reviews?: { user: IUser; text: string; rating: number; createdAt: Date }[];
	availability?: string;
}
