import React, { FC, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import { Form, FormGroup, FormLabel, FormControl, Button, Dropdown } from "react-bootstrap";
import { useAppSelector } from "features/hooks/useAppSelector";
import styles from './LaptopFields.module.scss';
import { MyButton } from "shared/ui/Button";
import { LaptopTypes } from "entities/products/model/types/LaptopType"

interface LatopFields {
	className?: string;
	laptopType?: LaptopTypes;
	onHide: () => void;
}

export const LaptopFields: FC<LatopFields> = ({ className, laptopType, onHide }) => {
	const [laptop, setLaptop] = useState<LaptopTypes>({
		name: "",
		price: 0,
		brand: "",
		description: "",
		images: [],
		model: "",
		specifications: [
			{ name: "processor", value: '' },
			{ name: "graphics card", value: '' },
			{ name: "operating system", value: '' },
			{ name: "storage", value: '' },
			{ name: "ram", value: '' },
			{ name: "ports and connectors", value: '' },
			{ name: "dimensions and weight", value: '' },
			{ name: "power supply unit", value: '' },
			{ name: "screen diagonal", value: '' },
			{ name: "screen resolution", value: '' },
			{ name: "screen type", value: '' },
			{ name: "battery life", value: '' },
			{ name: "camera", value: '' },
			{ name: "audio", value: '' },
			{ name: "operating system", value: '' },
		]
	});
	console.log(laptop);

	const [selectedBrand, setSelectedBrand] = useState<string>("");
	const brands = useAppSelector(state => state.products.types);
	const laptopBrands = brands[3].brands
	console.log(laptopBrands);

	const [nameError, setNameError] = useState<string>("");
	const [priceError, setPriceError] = useState<string>("");
	const [modelError, setModelError] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLaptop(prevState => ({
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
		setLaptop(prev => ({
			...prev,
			images: imagesArray
		}))
	};


	const handleBrandSelect = (brand: string) => {
		setLaptop(prev => ({
			...prev,
			brand
		}))
		setSelectedBrand(brand)
	};

	const handleSpecificationChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
		const value = e.target.value;
		const updatedSpecifications = laptop.specifications.map(spec => {
			if (spec.name === name) {
				return { ...spec, value: value };
			}
			return spec;
		});

		setLaptop(prev => ({
			...prev,
			specifications: updatedSpecifications
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (laptop.model.trim() === "") {
			setModelError("Model is required");
			return;
		}
		if (laptop.name.trim() === "") {
			setNameError("Name is required");
			return;
		}
		if (laptop.price === 0) {
			setPriceError("Please set price");
			return;
		}

		setNameError("");
		setPriceError("");
		setModelError("");
		onHide();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Dropdown className="mt-4">
				<Dropdown.Toggle>{selectedBrand ? selectedBrand : 'Select Brand'}</Dropdown.Toggle>
				<Dropdown.Menu>
					{laptopBrands.map(brand =>
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
					value={laptop.name}
					onChange={handleChange}
				/>
				{nameError && <div className="text-danger">{nameError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Price</FormLabel>
				<FormControl
					type="number"
					name="price"
					value={laptop.price}
					onChange={handleChange}
				/>
				{priceError && <div className="text-danger">{priceError}</div>}
			</FormGroup>

			<FormGroup>
				<FormLabel>Model</FormLabel>
				<FormControl
					type="text"
					name="model"
					value={laptop.model}
					onChange={handleChange}
				/>
				{modelError && <div className="text-danger">{modelError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Description</FormLabel>
				<FormControl
					as="textarea"
					name="description"
					value={laptop.description}
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
						name="graphicsName"
						value="graphics card"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="ramValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'graphics card')}
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
						name="ramName"
						value="Ram"
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
						name="portsAndConnectors"
						value="Ports"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="portsValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'ports and connectors')}
					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="dimensionsAndWeight"
						value="Dimensions"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="dimensiosValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'dimensions and weight')}
					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="powerSupplyUnit"
						value="Power"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="powerValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'power supply unit')}
					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex mt-2'])}>
					<FormControl
						type="text"
						name="ScreenDiagonalName"
						value="Screen diagonal"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="screenValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'screen diagonal')}

					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="ScreenResolutionName"
						value="Screen resolution"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="screnResValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'screen resolution')}
					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="screenTypeName"
						value="Screen type"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="screnTValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'screen type')}
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

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="battery"
						value="Battery life"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="batteryLValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'battery life')}
					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="audio"
						value="Audio"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="audioValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'audio')}
					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="operatingSystem"
						value="Operating system"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="OperatingValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'operating system')}
					/>
				</div>
			</FormGroup>

			<MyButton className={styles.addedBtn} type="submit">Added device</MyButton>
		</Form>
	);
};

