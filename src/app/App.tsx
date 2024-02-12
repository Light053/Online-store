import { FC } from "react"
import './styles/reset.scss'
import './styles/index.scss'
import { Navbar } from "widgets/Navbar/Navbar"

interface AppProps {
	className?: string
}

export const App: FC<AppProps> = ({ className }) => {

	return (
		<div className="App">
			<Navbar />
		</div>
	)
}