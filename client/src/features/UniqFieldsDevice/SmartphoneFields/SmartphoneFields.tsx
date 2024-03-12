import React, { FC, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import { SmartphonesTypes } from "entities/products/model/types/smartphonesType";
import { Form, FormGroup, FormLabel, FormControl, Button, Dropdown } from "react-bootstrap";
import { useAppSelector } from "features/hooks/useAppSelector";
import styles from './SmartphoneField.module.scss';
import { MyButton } from "shared/ui/Button";
import { universalHandleBrandSelect } from "features/functionForFields/handleBrandSelect";
import { universalHandleChange } from "features/functionForFields/handleChange";
import { universalHandleSpecificationChange } from "features/functionForFields/handleSpecificationChange";
import { universalHandleImages } from "features/functionForFields/handleImages";
import { setProdct } from "shared/lib/setProduct/setProduct";


interface SmartphoneFieldsProps {
	className?: string;
	selectedType?: string;
	onHide: () => void;
}

export const SmartphoneFields: FC<SmartphoneFieldsProps> = ({ className, selectedType, onHide }) => {
	console.log(selectedType);

	const [smartphone, setSmartphone] = useState<SmartphonesTypes>({
		name: "",
		price: 0,
		type: selectedType,
		brand: "",
		description: "",
		images: [],
		model: "",
		specifications: [
			{ name: "ram", value: '' },
			{ name: "processor", value: '' },
			{ name: "storage", value: '' },
			{ name: "display", value: '' },
			{ name: "camera", value: '' },
			{ name: "battery", value: '' },
		]
	});


	const [selectedBrand, setSelectedBrand] = useState<string>("");
	const brands = useAppSelector(state => state.products.types);
	const smBrands = brands[0].brands
	const [nameError, setNameError] = useState<string>("");
	const [priceError, setPriceError] = useState<string>("");
	const [modelError, setModelError] = useState<string>("");


	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (smartphone.model.trim() === "") {
			setModelError("Model is required");
			return;
		}
		if (smartphone.name.trim() === "") {
			setNameError("Name is required");
			return;
		}
		if (smartphone.price === 0) {
			setPriceError("Please set price");
			return;
		}
		setProdct(smartphone)
		setNameError("");
		setPriceError("");
		setModelError("");
		onHide();
	};
	console.log(smartphone);

	return (
		<Form onSubmit={handleSubmit}>
			<Dropdown className="mt-4">
				<Dropdown.Toggle>{selectedBrand ? selectedBrand : 'Select Brand'}</Dropdown.Toggle>
				<Dropdown.Menu>
					{smBrands.map(brand =>
						<Dropdown.Item
							key={brand}
							onClick={() => universalHandleBrandSelect(brand, setSmartphone, setSelectedBrand)}
						>
							{brand}
						</Dropdown.Item>)}
				</Dropdown.Menu>
			</Dropdown>
			<FormGroup>
				<FormLabel>Name</FormLabel>
				<FormControl
					type="text"
					name="name"
					value={smartphone.name}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setSmartphone)}
				/>
				{nameError && <div className="text-danger">{nameError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Price</FormLabel>
				<FormControl
					type="number"
					name="price"
					value={smartphone.price}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setSmartphone)}
				/>
				{priceError && <div className="text-danger">{priceError}</div>}
			</FormGroup>

			<FormGroup>
				<FormLabel>Model</FormLabel>
				<FormControl
					type="text"
					name="model"
					value={smartphone.model}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setSmartphone)}
				/>
				{modelError && <div className="text-danger">{modelError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Description</FormLabel>
				<FormControl
					as="textarea"
					name="description"
					value={smartphone.description}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setSmartphone)}
				/>
			</FormGroup>
			<FormGroup>
				<FormLabel>Images</FormLabel>
				<FormControl
					as="input"
					type="url"
					name="images"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleImages(e, setSmartphone)}
				/>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex mt-4'])}>
					<FormControl
						type="text"
						name="processorName"
						value="Processor"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="processorValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'processor', setSmartphone, smartphone)}

					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="ramName"
						value="RAM"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="ramValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'ram', setSmartphone, smartphone)}
					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="storageName"
						value="Storage"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="storageValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'storage', setSmartphone, smartphone)}
					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="display"
						value="Display"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="displayValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'display', setSmartphone, smartphone)}
					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="battery"
						value="Battery"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="batteryValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'battery', setSmartphone, smartphone)}
					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="camera"
						value="Camera"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="cameraValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'camera', setSmartphone, smartphone)}
					/>
				</div>
			</FormGroup>


			<MyButton className={styles.addedBtn} type="submit">Added device</MyButton>
		</Form>
	);
};

