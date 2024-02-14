import { ActionCreatorWithOptionalPayload, createAction } from "@reduxjs/toolkit";
import { SET_AUTH_STATUS } from "./consts";
import { User } from "entities/user/model/types/user-types";



export const setAuths = createAction(SET_AUTH_STATUS, (isAuth: boolean) => ({
	payload: {
		isAuth
	}
}))