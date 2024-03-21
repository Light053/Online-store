import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/user-types";
import { IUser } from "app/models/response/IUser";
import { DataType } from "../types/data-type";

const initialState: User = {
	isAuth: false,
	user: { username: { username: '', basket: null, password: '', roles: [] }, id: '' },
	error: { message: '', errors: [] },
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// login
		userLogin: (state) => {
			state.error = { message: '', errors: [] };
		},
		userLoginSuccess: (state, action: PayloadAction<IUser>) => {
			state.error = { message: '', errors: [] };
			state.user = action.payload;
			state.isAuth = true;
			console.log(state.user);
			console.log(action.payload);


		},
		userLoginError: (state, action: PayloadAction<DataType>) => {
			state.error = action.payload;
		},

		// register
		userRegistration: (state) => {
			state.error = { message: '', errors: [] };
		},
		userRegistrationSuccess: (state, action: PayloadAction<IUser>) => {
			state.error = { message: '', errors: [] };
			state.user = action.payload;
			state.isAuth = true;
		},
		userRegistrationError: (state, action: PayloadAction<DataType>) => {
			state.error = action.payload;
		},

		// logout

		userLogout: (state) => {
			state.error = { message: '', errors: [] };
		},
		userLogoutSuccess: (state, action: PayloadAction<IUser>) => {
			state.error = { message: '', errors: [] };
			state.user = action.payload;
			state.isAuth = false;
		},
		userLogoutError: (state, action: PayloadAction<DataType>) => {
			state.error = action.payload;
		},

		// checkAuth 

		userCheckAuth: (state) => {
			state.error = { message: '', errors: [] };

		},
		userCheckAuthSuccess: (state, action: PayloadAction<IUser>) => {
			state.error = { message: '', errors: [] };
			state.user = action.payload;
			state.isAuth = true;
			console.log(state.user);
		},
		userCheckAuthError: (state, action: PayloadAction<DataType>) => {
			state.error = action.payload;
		},
	},

})


export const { userLogin, userLoginError, userLoginSuccess } = userSlice.actions;

export const UserReducer = userSlice.reducer;
