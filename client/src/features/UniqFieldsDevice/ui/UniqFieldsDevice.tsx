import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './UniqFieldsDevice.module.scss'
import { Form } from "react-bootstrap"

interface UniqFieldsDeviceProps {
	className?: string,
	selectedType: string
}

export const UniqFieldsDevice: FC<UniqFieldsDeviceProps> = ({ className, selectedType }) => {

	return (
		<Form>

		</Form>
	)
}