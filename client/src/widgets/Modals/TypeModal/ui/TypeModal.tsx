import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './TypeModal.module.scss'
import { Button, Modal } from "react-bootstrap"

interface TypeModalProps {
	className?: string
}

export const TypeModal: FC<TypeModalProps> = (props) => {
	const { className, ...otherProps } = props

	return (
		<Modal
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			{...otherProps}
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Modal heading
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>Centered Modal</h4>
				<p>
					Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
					dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
					consectetur ac, vestibulum at eros.
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button>Close</Button>
			</Modal.Footer>
		</Modal>
	)
}