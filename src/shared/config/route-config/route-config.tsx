import { MainPage } from "pages/MainPage/MainPage"
import { RouteProps } from "react-router"

enum AppRoutes {
	STORE = 'main',
}

export const RouterPath: Record<AppRoutes, string> = {
	[AppRoutes.STORE]: '/store',
}

export const routerConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.STORE]: {
		path: RouterPath.main,
		element: <MainPage />
	},
}