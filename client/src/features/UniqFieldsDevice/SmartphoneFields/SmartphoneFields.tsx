import React, { FC, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import { SmartphonesTypes } from "entities/products/model/types/smartphonesType";
import { Form, FormGroup, FormLabel, FormControl, Button, Dropdown } from "react-bootstrap";
import { useAppSelector } from "features/hooks/useAppSelector";
import styles from './SmartphoneField.module.scss';
import { MyButton } from "shared/ui/Button";

interface SmartphoneFieldsProps {
	className?: string;
	SmartphoneType?: SmartphonesTypes;
	onHide: () => void;
}

export const SmartphoneFields: FC<SmartphoneFieldsProps> = ({ className, SmartphoneType, onHide }) => {
	const [smartphone, setSmartphone] = useState<SmartphonesTypes>({
		name: "",
		price: 0,
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSmartphone(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
		const imagesString = e.target.value;
		const imagesArray = imagesString.split(" ").filter((url) => {
			const urlPattern = /^((http|https):\/\/)/;
			return urlPattern.test(url);
		});
		setSmartphone(prev => ({
			...prev,
			images: imagesArray
		}))
	};


	const handleBrandSelect = (brand: string) => {
		setSmartphone(prev => ({
			...prev,
			brand
		}))
		setSelectedBrand(brand)
	};

	const handleSpecificationChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
		const value = e.target.value;
		const updatedSpecifications = smartphone.specifications.map(spec => {
			if (spec.name === name) {
				return { ...spec, value: value };
			}
			return spec;
		});

		setSmartphone(prev => ({
			...prev,
			specifications: updatedSpecifications
		}));
	};

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
							onClick={() => handleBrandSelect(brand)}
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
					onChange={handleChange}
				/>
				{nameError && <div className="text-danger">{nameError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Price</FormLabel>
				<FormControl
					type="number"
					name="price"
					value={smartphone.price}
					onChange={handleChange}
				/>
				{priceError && <div className="text-danger">{priceError}</div>}
			</FormGroup>

			<FormGroup>
				<FormLabel>Model</FormLabel>
				<FormControl
					type="text"
					name="model"
					value={smartphone.model}
					onChange={handleChange}
				/>
				{modelError && <div className="text-danger">{modelError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Description</FormLabel>
				<FormControl
					as="textarea"
					name="description"
					value={smartphone.description}
					onChange={handleChange}
				/>
			</FormGroup>
			<FormGroup>
				<FormLabel>Images</FormLabel>
				<FormControl
					as="input"
					type="url"
					name="images"
					onChange={handleImages}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'processor')}

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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'ram')}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'storage')}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'display')}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'battery')}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'camera')}
					/>
				</div>
			</FormGroup>


			<MyButton className={styles.addedBtn} type="submit">Added device</MyButton>
		</Form>
	);
};

