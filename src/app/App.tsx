import { FC } from "react"
import './styles/reset.scss'

interface AppProps {
	className?: string
}

export const App: FC<AppProps> = ({ className }) => {

	return (
		<div>
			HELLO WORLD
		</div>
	)
}