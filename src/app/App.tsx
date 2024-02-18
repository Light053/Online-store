import { FC } from "react"
import './styles/reset.scss'
import './styles/index.scss'
import { NavBar } from "widgets/NavBar/index"
import { AppRouter } from "./providers/router"



interface AppProps {
	className?: string
}

export const App: FC<AppProps> = ({ className }) => {

	return (
		<div className="App dark">
			<NavBar />
			<div className="content-page">
				<AppRouter />
			</div>
		</div>
	)
}