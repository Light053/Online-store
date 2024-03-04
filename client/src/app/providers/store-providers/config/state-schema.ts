import { StateTypes } from "entities/products/model/types/stateType";
import { User } from "entities/user/model/types/user-types";

export interface StateSchema {
	user: User,
	products: StateTypes
}