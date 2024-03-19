import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './UserPage.module.scss'


interface UserPageProps {
	className?: string
}

export const UserPage: FC<UserPageProps> = ({ className }) => {

	return (
		<div className={classNames(styles.UserPage, {}, [])}>
			user page
		</div>
	)
}