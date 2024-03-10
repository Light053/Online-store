import { SmartphonesTypes } from "entities/products/model/types/smartphonesType";

export const universalHandleChange = (e: React.ChangeEvent<HTMLInputElement>, setState: Function) => {
	const { name, value } = e.target;
	setState((prev: SmartphonesTypes) => ({
		...prev,
		[name]: value
	}));
};