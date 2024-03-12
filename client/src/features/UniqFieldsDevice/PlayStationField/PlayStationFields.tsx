import React, { FC, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import { Form, FormGroup, FormLabel, FormControl, Button, Dropdown } from "react-bootstrap";
import { useAppSelector } from "features/hooks/useAppSelector";
import styles from './PlayStation.module.scss';
import { PlayStationTypes } from "entities/products/model/types/PlayStationType";
import { MyButton } from "shared/ui/Button/ui/MyButton";
import { universalHandleBrandSelect } from "features/functionForFields/handleBrandSelect";
import { universalHandleChange } from "features/functionForFields/handleChange";
import { universalHandleSpecificationChange } from "features/functionForFields/handleSpecificationChange";
import { universalHandleImages } from "features/functionForFields/handleImages";
import { setProdct } from "shared/lib/setProduct/setProduct";

interface PlayStationFieldsProps {
	className?: string;
	selectedType?: string;
	onHide: () => void;
}

export const PlayStationFields: FC<PlayStationFieldsProps> = ({ className, selectedType, onHide }) => {
	console.log(selectedType);

	const [playStation, setPlayStation] = useState<PlayStationTypes>({
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
		]
	});

	console.log(playStation);

	const [selectedBrand, setSelectedBrand] = useState<string>("");
	const brands = useAppSelector(state => state.products.types);
	const psBrands = brands[2].brands
	console.log(psBrands);

	const [nameError, setNameError] = useState<string>("");
	const [priceError, setPriceError] = useState<string>("");
	const [modelError, setModelError] = useState<string>("");


	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (playStation.model.trim() === "") {
			setModelError("Model is required");
			return;
		}
		if (playStation.name.trim() === "") {
			setNameError("Name is required");
			return;
		}
		if (playStation.price === 0) {
			setPriceError("Please set price");
			return;
		}

		setNameError("");
		setPriceError("");
		setModelError("");
		setProdct(playStation)
		onHide();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Dropdown className="mt-4">
				<Dropdown.Toggle>{selectedBrand ? selectedBrand : 'Select Brand'}</Dropdown.Toggle>
				<Dropdown.Menu>
					{psBrands.map(brand =>
						<Dropdown.Item
							key={brand}
							onClick={() => universalHandleBrandSelect(brand, setPlayStation, setSelectedBrand)}
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
					value={playStation.name}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setPlayStation)}
				/>
				{nameError && <div className="text-danger">{nameError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Price</FormLabel>
				<FormControl
					type="number"
					name="price"
					value={playStation.price}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setPlayStation)}
				/>
				{priceError && <div className="text-danger">{priceError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Model</FormLabel>
				<FormControl
					type="text"
					name="model"
					value={playStation.model}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setPlayStation)}
				/>
				{modelError && <div className="text-danger">{modelError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Description</FormLabel>
				<FormControl
					as="textarea"
					name="description"
					value={playStation.description}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleChange(e, setPlayStation)}
				/>
			</FormGroup>
			<FormGroup>
				<FormLabel>Images</FormLabel>
				<FormControl
					as="input"
					type="url"
					name="images"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleImages(e, setPlayStation)}
				/>
			</FormGroup>


			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex mt-2'])}>
					<FormControl
						type="text"
						name="powerName"
						value="power"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="powerValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'power supply unit', setPlayStation, playStation)}

					/>
				</div>
			</FormGroup>


			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex mt-2'])}>
					<FormControl
						type="text"
						name="dimensions"
						value="dimensions"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="dimensionsValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'dimensions and weight', setPlayStation, playStation)}

					/>
				</div>
			</FormGroup>


			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex mt-2'])}>
					<FormControl
						type="text"
						name="portsName"
						value="ports"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="portsValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'ports and connectors', setPlayStation, playStation)}

					/>
				</div>
			</FormGroup>


			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex mt-2'])}>
					<FormControl
						type="text"
						name="graphicsName"
						value="graphics card"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="graphicsValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'graphics card', setPlayStation, playStation)}

					/>
				</div>
			</FormGroup>

			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex mt-2'])}>
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'processor', setPlayStation, playStation)}

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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'ram', setPlayStation, playStation)}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => universalHandleSpecificationChange(e, 'storage', setPlayStation, playStation)}
					/>
				</div>
			</FormGroup>

			<MyButton className={styles.addedBtn} type="submit">Added device</MyButton>
		</Form>
	);
};

