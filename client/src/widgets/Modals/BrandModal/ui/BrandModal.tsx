import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './BrandModal.module.scss'


interface BrandModalProps {
	className?: string
}

export const BrandModal: FC<BrandModalProps> = ({ className }) => {

	return (
		<div className={classNames(styles.BrandModal, {}, [])}></div>
	)
}