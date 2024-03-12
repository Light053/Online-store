import React, { FC, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import { Form, FormGroup, FormLabel, FormControl, Button, Dropdown } from "react-bootstrap";
import { useAppSelector } from "features/hooks/useAppSelector";
import styles from './LaptopFields.module.scss';
import { MyButton } from "shared/ui/Button";
import { LaptopTypes } from "entities/products/model/types/LaptopType"
import { universalHandleBrandSelect } from "features/functionForFields/handleBrandSelect";
import { universalHandleChange } from "features/functionForFields/handleChange";
import { universalHandleImages } from "features/functionForFields/handleImages";
import { universalHandleSpecificationChange } from "features/functionForFields/handleSpecificationChange";
import { setProdct } from "shared/lib/setProduct/setProduct";

interface LatopFields {
	className?: string;
	selectedType?: string;
	onHide: () => void;
}

export const LaptopFields: FC<LatopFields> = ({ className, selectedType, onHide }) => {
	console.log(selectedType);
	const [laptop, setLaptop] = useState<LaptopTypes>({
		name: "",
		type: selectedType,
		price: 0,
		brand: "",
		description: "",
		images: [],
		model: "",
		specifications: [
			{ name: "processor", value: '' },
			{ name: "graphics card", value: '' },
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
		setProdct(laptop)
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
							onClick={() => universalHandleBrandSelect(brand, setLaptop, setSelectedBrand)}
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
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setLaptop)}
				/>
				{nameError && <div className="text-danger">{nameError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Price</FormLabel>
				<FormControl
					type="number"
					name="price"
					value={laptop.price}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setLaptop)}
				/>
				{priceError && <div className="text-danger">{priceError}</div>}
			</FormGroup>

			<FormGroup>
				<FormLabel>Model</FormLabel>
				<FormControl
					type="text"
					name="model"
					value={laptop.model}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setLaptop)}
				/>
				{modelError && <div className="text-danger">{modelError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Description</FormLabel>
				<FormControl
					as="textarea"
					name="description"
					value={laptop.description}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setLaptop)}
				/>
			</FormGroup>
			<FormGroup>
				<FormLabel>Images</FormLabel>
				<FormControl
					as="input"
					type="url"
					name="images"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleImages(e, setLaptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'processor', setLaptop, laptop)}

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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'graphics card', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'storage', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'ram', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'display', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'battery', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'ports and connectors', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'dimensions and weight', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'power supply unit', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'screen diagonal', setLaptop, laptop)}

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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'screen resolution', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'screen type', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'camera', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'battery life', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'audio', setLaptop, laptop)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'operating system', setLaptop, laptop)}
					/>
				</div>
			</FormGroup>

			<MyButton className={styles.addedBtn} type="submit">Added device</MyButton>
		</Form>
	);
};

