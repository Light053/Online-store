import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './MainPage.module.scss'
import { Col, Container, Row } from "react-bootstrap"
import { TypeBar } from "shared/ui/TypeBar"

interface MainPageProps {
	className?: string
}

export const MainPage: FC<MainPageProps> = ({ className }) => {

	return (
		<div className={classNames(styles.MainPage, {}, [])}>
			<Container>
				<Row>
					<Col md={3} className="mt-3">
						<TypeBar />
					</Col>
				</Row>
			</Container>
		</div>
	)
}
