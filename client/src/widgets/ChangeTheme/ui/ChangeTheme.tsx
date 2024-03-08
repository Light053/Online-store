import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './ChangeTheme.module.scss'
import { Button } from "react-bootstrap"

interface ChangeThemeProps {
	className?: string,
	handleTheme: () => void
}

export const ChangeTheme: FC<ChangeThemeProps> = ({ className, handleTheme }) => {

	return (
		<Button
			variant={'outline-light'}
			onClick={() => handleTheme()}
			className={classNames(styles.ChangeTheme, {}, [className])}>
			change
		</Button>
	)
}