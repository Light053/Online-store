import { FC, useEffect, useState } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './ChangeTheme.module.scss'
import { Button } from "react-bootstrap"
import { MyButton } from "shared/ui/Button"
import DayIcon from 'shared/assets/day.svg'
import NightIcon from 'shared/assets/night.svg'


interface ChangeThemeProps {
	className?: string,
	handleTheme: () => void
}

export const ChangeTheme: FC<ChangeThemeProps> = ({ className, handleTheme }) => {
	const theme = JSON.parse(localStorage.getItem("theme"));
	console.log(theme);

	return (
		<MyButton
			onClick={() => handleTheme()}
			className={classNames(styles.ChangeTheme, {}, [className])}>
			{theme ? <NightIcon width={30} /> : <DayIcon width={30} height={30} />}
		</MyButton>
	)
}