import { AuthPage } from "pages/AuthPage"
import { MainPage } from "pages/MainPage"
import { RouteProps } from "react-router"
import { DeviceInfoPage } from "pages/DeviceInfo";

enum AppRoutes {
	STORE = 'main',
	DEVICE_ROUTE = 'deviceInfo',
	AUTH = 'authorization',
	REGISTRATION = 'registration'
}

export const RouterPath: Record<AppRoutes, string> = {
	[AppRoutes.STORE]: '/',
	[AppRoutes.AUTH]: '/authorization',
	[AppRoutes.REGISTRATION]: '/registration',
	[AppRoutes.DEVICE_ROUTE]: '/:name'
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
	}
}
