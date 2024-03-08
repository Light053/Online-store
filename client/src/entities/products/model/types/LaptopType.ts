import { IUser } from "app/models/response/IUser";

export interface LaptopTypes {
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
	screenSize?: string;
	processor?: string;
	memory?: string;
	storage?: string;
	graphicsCard?: string;
	operatingSystem?: string;
}