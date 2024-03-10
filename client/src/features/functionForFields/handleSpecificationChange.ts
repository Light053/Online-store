import { LaptopTypes } from "entities/products/model/types/LaptopType";
import { DesktopPCtypes } from "entities/products/model/types/PCTypes";
import { PlayStationTypes } from "entities/products/model/types/PlayStationType";
import { SmartphonesTypes } from "entities/products/model/types/smartphonesType";

export const universalHandleSpecificationChange = (
	e: React.ChangeEvent<HTMLInputElement>, name: string, setState: Function,
	state: SmartphonesTypes | DesktopPCtypes | PlayStationTypes | LaptopTypes
) => {
	const value = e.target.value;
	const updatedSpecifications = state.specifications.map(spec => {
		if (spec.name === name) {
			return { ...spec, value: value };
		}
		return spec;
	});

	setState((prev: SmartphonesTypes) => ({
		...prev,
		specifications: updatedSpecifications
	}));
};