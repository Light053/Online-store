import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './DesktopPCFields.module.scss'
import { DesktopPCtypes } from "entities/products/model/types/PCTypes";


interface DesktopPCFieldsProps {
	className?: string,
	PCType?: DesktopPCtypes;
}

export const DesktopPCFields: FC<DesktopPCFieldsProps> = ({ className }) => {

	return (
		<div className={classNames(styles.DesktopPCFields, {}, [])}></div>
	)
}