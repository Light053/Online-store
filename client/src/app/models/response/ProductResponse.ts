import { IUser } from "./IUser";

export interface ProductResponse {
	name: string;
	type: string,
	brand?: string;
	model?: string;
	description?: string;
	price: number;
	quantity?: number;
	category?: string;
	specifications?: { name: string; value: string }[];
	images?: string[];
	rating?: number;
	reviews?: { username: string; text: string; rating: number; createdAt: Date }[];
	availability?: string;
}
