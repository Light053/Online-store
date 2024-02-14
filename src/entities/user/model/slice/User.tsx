import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user-types";

const initialState: User = {
	id: 1,
	isAuth: false
}

const userSlice = createSlice({
	initialState,
	name: 'user',
	reducers: {
		SET_AUTH_STATUS: (state, action) => {
			state.isAuth = action.payload.isAuth;
		}
	}
})


export const { reducer: UserReducer } = userSlice;