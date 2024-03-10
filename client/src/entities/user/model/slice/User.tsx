import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user-types";
import { IUser } from "app/models/response/IUser";

const initialState: User = {
	isAuth: false,
	user: null,
	error: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// login
		userLogin: (state) => {
			state.error = ''
		},
		userLoginSuccess: (state, action: PayloadAction<IUser>) => {
			state.error = '';
			state.user = action.payload;
			console.log('llllll', state.user);

			state.isAuth = true;
			console.log(state.isAuth);
		},
		userLoginError: (state, action) => {
			state.error = action.payload
			console.log(state.error);
		},

		// register
		userRegistration: (state) => {
			state.error = ''
		},
		userRegistrationSuccess: (state, action: PayloadAction<IUser>) => {
			state.error = '';
			state.user = action.payload;
			state.isAuth = true;
			console.log(state.isAuth);
		},
		userRegistrationError: (state, action) => {
			state.error = action.payload
			console.log(action.payload);
		},

		// logout

		userLogout: (state) => {
			state.error = '';
		},
		userLogoutSuccess: (state, action) => {
			state.error = '';
			state.user = action.payload;
			state.isAuth = false;
		},
		userLogoutError: (state, action) => {
			state.error = action.payload
		},

		// checkAuth 

		userCheckAuth: (state) => {
			state.error = '';
		},
		userCheckAuthSuccess: (state, action: PayloadAction<IUser>) => {
			state.error = '';
			state.user = action.payload;
			state.isAuth = true;
		},
		userCheckAuthError: (state, action) => {
			state.error = action.payload
		},
	},

})


export const { userLogin, userLoginError, userLoginSuccess } = userSlice.actions;

export const UserReducer = userSlice.reducer;