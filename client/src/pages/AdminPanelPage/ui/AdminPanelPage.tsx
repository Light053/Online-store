import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './AdminPanelPage.module.scss'
import { Button, Container } from "react-bootstrap"

interface AdminPanelPageProps {
	className?: string
}

export const AdminPanelPage: FC<AdminPanelPageProps> = ({ className }) => {



	return (
		<Container className={classNames(styles.AdminPanelPage, {}, ['d-flex flex-column'])}>
			<Button className={classNames(styles.addType, {}, ['mt-3 p-2'])} variant="outline-light">Add type</Button>
			<Button className={classNames(styles.addBrand, {}, ['mt-3 p-2'])} variant="outline-light">Add brand</Button>
			<Button className={classNames(styles.addDevice, {}, ['mt-3 p-2'])} variant="outline-light">Add device</Button>
		</Container>
	)
}