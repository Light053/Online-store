import { ReviewResponse } from "app/models/response/ReviewResponse";
import { BrandTypes } from "./brandsType";
import { ReviewType } from "./reviewType";
import { SmartphonesTypes } from "./smartphonesType";
import { TypesType } from "./typesType";

export interface StateTypes {
	smartphones: SmartphonesTypes[],
	types: TypesType[];
	isLoading: boolean,
	error: string,
	selectedType: {},
	selectedBrand: {},
	reviews: ReviewResponse[]
}