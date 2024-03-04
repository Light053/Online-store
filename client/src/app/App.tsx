import { FC, useEffect } from "react"
import './styles/reset.scss'
import './styles/index.scss'
import { NavBar } from "widgets/NavBar/index"
import { AppRouter } from "./providers/router"
import { checkAuth } from "entities/user/model/actionCreators"
import { useAppSelector } from "features/hooks/useAppSelector"
import { useAppDispatch } from "features/hooks/useAppDispatch"
import { fetchSmartphones } from "entities/products/model/actionsCreatots"

interface AppProps {
	className?: string
}

export const App: FC<AppProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(state => state.user.isAuth)
	const smartphones = useAppSelector(state => state.products.smartphones)
	const isLoading = useAppSelector(state => state.products.isLoading)

	useEffect(() => {
		const fetchApi = async () => {
			dispatch(fetchSmartphones());
		}
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
		}
		fetchApi();
	}, [dispatch])

	return (
		<div className="App dark">
			<NavBar />
			<div className="content-page">
				<AppRouter />
			</div>
		</div>
	)
}
