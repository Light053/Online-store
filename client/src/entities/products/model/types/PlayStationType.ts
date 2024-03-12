import { IUser } from "app/models/response/IUser";

export interface PlayStationTypes {
	name?: string;
	type: string
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
	storage?: string;
	resolution?: string;
	controllerType?: string;
	onlineFeatures?: string[];
}