import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './MainPage.module.scss'

interface MainPageProps {
	className?: string
}

export const MainPage: FC<MainPageProps> = ({ className }) => {

	return (
		<div className={classNames(styles.MainPage, {}, [])}></div>
	)
}