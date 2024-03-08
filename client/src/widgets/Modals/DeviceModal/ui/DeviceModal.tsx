import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './DeviceModal.module.scss'
import { useTranslation } from "react-i18next"

interface DeviceModalProps {
	className?: string
}

export const DeviceModal: FC<DeviceModalProps> = ({ className }) => {
	const { t } = useTranslation()
	return (
		<div className={classNames(styles.DeviceModal, {}, [])}></div>
	)
}