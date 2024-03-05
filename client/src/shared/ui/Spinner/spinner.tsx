import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './spinner.module.scss'

export const spinner: FC = () => {

	return (
		<span className={styles.loader}></span>
	)
}