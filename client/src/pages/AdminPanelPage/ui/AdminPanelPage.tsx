import { FC, useState } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './AdminPanelPage.module.scss'
import { Container } from "react-bootstrap"
import { MyButton } from "shared/ui/Button"
import { DeviceModal } from "widgets/Modals/DeviceModal"

interface AdminPanelPageProps {
	className?: string
}

export const AdminPanelPage: FC<AdminPanelPageProps> = ({ className }) => {

	const [modalVision, setModalVision] = useState<boolean>(false)

	return (
		<Container className={classNames(styles.AdminPanelPage, {}, ['d-flex flex-column'])}>
			<MyButton onClick={() => setModalVision(true)} className={classNames(styles.addType, {}, ['mt-3 p-2'])}>Add device</MyButton>
			<DeviceModal show={modalVision} onHide={() => setModalVision(false)}></DeviceModal>
		</Container>
	)
}