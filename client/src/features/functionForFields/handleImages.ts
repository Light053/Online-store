import { SmartphonesTypes } from "entities/products/model/types/smartphonesType";

export const universalHandleImages = (e: React.ChangeEvent<HTMLInputElement>, setState: Function) => {

	const imagesString = e.target.value;

	const imagesArray = imagesString.split(" ").filter((url) => {
		const urlPattern = /^((http|https):\/\/)/;
		return urlPattern.test(url);
	});

	setState((prev: SmartphonesTypes) => ({
		...prev,
		images: imagesArray
	}))
}