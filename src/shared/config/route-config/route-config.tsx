import { Auth } from "pages/Auth"
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
		element: <Auth />
	},
	[AppRoutes.REGISTRATION]: {
		path: RouterPath.registration,
		element: <Auth />
	}
}