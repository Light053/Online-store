import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './LaptopFields.module.scss'
import { LaptopTypes } from "entities/products/model/types/LaptopType";


interface LaptopFieldsProps {
	className?: string,
	LaptopType?: LaptopTypes;
}

export const LaptopFields: FC<LaptopFieldsProps> = ({ className }) => {

	return (
		<div className={classNames(styles.LaptopFields, {}, [])}></div>
	)
}