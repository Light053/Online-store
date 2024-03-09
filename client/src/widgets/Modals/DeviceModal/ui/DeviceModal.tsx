import { FC, useState } from "react";
import { Dropdown, Form, Modal } from "react-bootstrap";
import { MyButton } from "shared/ui/Button";
import { useAppSelector } from "features/hooks/useAppSelector";
import styles from './DeviceModal.module.scss'
import { SmartphoneFields } from "features/UniqFieldsDevice/SmartphoneFields/SmartphoneFields";
import { UniqFieldsDevice } from "features/UniqFieldsDevice";

interface DeviceModalProps {
	className?: string;
	show: boolean;
	onHide: () => void;
}

export const DeviceModal: FC<DeviceModalProps> = (props) => {
	const { className, show, onHide, ...otherProps } = props;

	const types = useAppSelector(state => state.products.types);
	const [selectedType, setSelectedType] = useState<string>("");

	const handleTypeSelect = (type: string) => {
		setSelectedType(type);
	};


	return (
		<Modal
			animation={true}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={show}
			onHide={() => onHide()}
			className={styles.DeviceModal}
			{...otherProps}
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Added device
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Dropdown>
					<Dropdown.Toggle>{selectedType ? selectedType : "Select Type"}</Dropdown.Toggle>
					<Dropdown.Menu>
						{types.map(type =>
							<Dropdown.Item
								key={type.name}
								onClick={() => handleTypeSelect(type.name)}
							>
								{type.name}
							</Dropdown.Item>)}

					</Dropdown.Menu>
				</Dropdown>
				<UniqFieldsDevice selectedType={selectedType} onHide={onHide} />
			</Modal.Body>
			<Modal.Footer>
				<MyButton className={styles.closeBtn} onClick={() => onHide()}>Close</MyButton>
			</Modal.Footer>
		</Modal>
	);
};
