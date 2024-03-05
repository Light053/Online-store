import { BrandTypes } from "./brandsType";
import { SmartphonesTypes } from "./smartphonesType";
import { TypesType } from "./typesType";

export interface StateTypes {
	smartphones: SmartphonesTypes[],
	brands: BrandTypes[],
	types: TypesType[];
	isLoading: boolean,
	error: string,
	selectedType: {},
	selectedBrand: {}
}