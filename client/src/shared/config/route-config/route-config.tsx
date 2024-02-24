import { AuthPage } from "pages/AuthPage"
import { MainPage } from "pages/MainPage"
import { RouteProps } from "react-router"

enum AppRoutes {
	STORE = 'main',
	AUTH = 'authorization',
	REGISTRATION = 'registration'
}

export const RouterPath: Record<AppRoutes, string> = {
	[AppRoutes.STORE]: '/store',
	[AppRoutes.AUTH]: '/authorization',
	[AppRoutes.REGISTRATION]: '/registration'

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
	}
}