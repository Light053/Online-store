import { SmartphonesTypes } from "entities/products/model/types/smartphonesType";

export const universalHandleBrandSelect = (brand: string, setState: Function, setBrand: Function) => {
	setState((prev: SmartphonesTypes) => ({
		...prev,
		brand
	}))
	setBrand(brand)
};