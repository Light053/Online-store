import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './UniqFieldsDevice.module.scss'
import { Form } from "react-bootstrap"
import { SmartphoneFields } from "../SmartphoneFields/SmartphoneFields"
import { DesktopPCFields } from "../DesktopPCFields/DesktopPCFields"
import { LaptopFields } from "../LaptopFields/LaptopFields"
import { PlayStationFields } from "../PlayStationField/PlayStationFields"

interface UniqFieldsDeviceProps {
	className?: string,
	selectedType: string,
	onHide: () => void
}

export const UniqFieldsDevice: FC<UniqFieldsDeviceProps> = ({ className, selectedType, onHide }) => {

	if (selectedType === 'Smartphone') {
		return (
			<SmartphoneFields onHide={onHide} selectedType={selectedType} />
		)
	}
	else if (selectedType === 'PC') {
		return (
			<DesktopPCFields onHide={onHide} selectedType={selectedType} />
		)
	}
	else if (selectedType === 'PlayStation') {
		return (
			<PlayStationFields onHide={onHide} selectedType={selectedType} />
		)
	}
	else if (selectedType === 'Laptop') {
		return (
			<LaptopFields onHide={onHide} selectedType={selectedType} />
		)
	}
}