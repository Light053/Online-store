import { ReviewResponse } from "app/models/response/ReviewResponse";
import { BrandTypes } from "./brandsType";
import { ReviewType } from "./reviewType";
import { SmartphonesTypes } from "./smartphonesType";
import { TypesType } from "./typesType";
import { productsQuanityType } from "./productsQuanityType";

export interface StateTypes {
	smartphones: SmartphonesTypes[],
	productsFromBasket: SmartphonesTypes[],
	types: TypesType[];
	isLoading: boolean,
	error: string,
	selectedType: { name: string, brands: string },
	selectedBrand: { name: string },
	reviews: ReviewType[],
	page: number,
	totalCount: number,
	limit: number,
	formSelectedType: string,
	productsQuanity: productsQuanityType[]
}