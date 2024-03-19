import { AuthPage } from "pages/AuthPage"
import { MainPage } from "pages/MainPage"
import { RouteProps } from "react-router"
import { DeviceInfoPage } from "pages/DeviceInfo";
import { AdminPanelPage } from "pages/AdminPanelPage";
import { BasketPage } from "pages/BasketPAge";
import { UserPage } from "pages/UserPage";

enum AppRoutes {
	STORE = 'main',
	DEVICE_ROUTE = 'deviceInfo',
	AUTH = 'authorization',
	REGISTRATION = 'registration',
	ADMIN_PANEL = 'admin',
	BASKET = 'basket',
	USER_PAGE = 'profile'
}

export const RouterPath: Record<AppRoutes, string> = {
	[AppRoutes.STORE]: '/',
	[AppRoutes.AUTH]: '/authorization',
	[AppRoutes.REGISTRATION]: '/registration',
	[AppRoutes.DEVICE_ROUTE]: '/deviceInfo/:name',
	[AppRoutes.ADMIN_PANEL]: '/admin',
	[AppRoutes.BASKET]: '/basket',
	[AppRoutes.USER_PAGE]: 'profile/:username'
}

export const routerConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.STORE]: {
		path: RouterPath.main,
		element: <MainPage />
	},
	[AppRoutes.AUTH]: {
		path: RouterPath.authorization,
		element: <AuthPage />
	},
	[AppRoutes.REGISTRATION]: {
		path: RouterPath.registration,
		element: <AuthPage />
	},
	[AppRoutes.DEVICE_ROUTE]: {
		path: RouterPath.deviceInfo,
		element: <DeviceInfoPage />
	},
	[AppRoutes.ADMIN_PANEL]: {
		path: RouterPath.admin,
		element: <AdminPanelPage />
	},
	[AppRoutes.BASKET]: {
		path: RouterPath.basket,
		element: <BasketPage />
	},
	[AppRoutes.USER_PAGE]: {
		path: RouterPath.profile,
		element: <UserPage />
	}
}
