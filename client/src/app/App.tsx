import { FC, useEffect } from "react"
import './styles/reset.scss'
import './styles/index.scss'
import { NavBar } from "widgets/NavBar/index"
import { AppRouter } from "./providers/router"
import { checkAuth } from "entities/user/model/actionCreators"
import { useAppDispatch } from "features/hooks/useAppDispatch"

interface AppProps {
	className?: string
}

export const App: FC<AppProps> = ({ className }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
		}
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
