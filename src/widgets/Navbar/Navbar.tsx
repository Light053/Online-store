import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './Navbar.module.scss'

interface NavbarProps {
	className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
	return (
		<div className={classNames(styles.Navbar, {}, [])}>

		</div>
	)
}