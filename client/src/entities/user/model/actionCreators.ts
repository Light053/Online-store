import { AppDispatch } from "app/providers/store-providers/config/store";
import AuthService from "app/service/UserService/AuthService";
import { userSlice } from "./slice/User";
import { IUser } from "app/models/response/IUser";
import axios from "axios";
import { AuthResponse } from "app/models/response/AuthResponse";
import { API_AUTH_URL } from "app/http";


export const loginUser = (username: string, password: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(userSlice.actions.userLogin())

		const response = await AuthService.login(username, password);
		localStorage.setItem('token', response.data.accesToken);

		dispatch(userSlice.actions.userLoginSuccess(response.data.user))

		return true
	} catch (error) {
		dispatch(userSlice.actions.userLoginError(error.response.data))
	}
}

export const registration = (username: string, password: string) => async (dispatch: AppDispatch) => {
	try {

		dispatch(userSlice.actions.userRegistration())

		const response = await AuthService.registration(username, password);
		localStorage.setItem('token', response.data.accesToken);

		dispatch(userSlice.actions.userRegistrationSuccess(response.data.user))

		return true

	} catch (error) {

		dispatch(userSlice.actions.userRegistrationError(error.response.data))
	}
}

export const logout = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(userSlice.actions.userLogout())

		const response = await AuthService.logout();
		localStorage.removeItem('token');
		localStorage.removeItem('basket');

		dispatch(userSlice.actions.userLogoutSuccess({} as IUser))
	} catch (error) {
		dispatch(userSlice.actions.userLogoutError(error.response.data.errors))
	}
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(userSlice.actions.userCheckAuth())

		const response = await axios.get<AuthResponse>(`${API_AUTH_URL}/refresh`, { withCredentials: true })
		console.log(response);

		dispatch(userSlice.actions.userCheckAuthSuccess())
		localStorage.setItem('token', response.data.accesToken);
		console.log(response.data.accesToken);

		dispatch(userSlice.actions.userRegistrationSuccess(response.data.user))
		console.log(response);
	} catch (error) {
		dispatch(userSlice.actions.userCheckAuthError(error.response.data))
	}
}