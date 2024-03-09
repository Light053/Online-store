import React, { FC, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import { Form, FormGroup, FormLabel, FormControl, Button, Dropdown } from "react-bootstrap";
import { useAppSelector } from "features/hooks/useAppSelector";
import styles from './PlayStation.module.scss';
import { PlayStationTypes } from "entities/products/model/types/PlayStationType";
import { MyButton } from "shared/ui/Button/ui/MyButton";

interface PlayStationFieldsProps {
	className?: string;
	pcType?: PlayStationTypes;
	onHide: () => void;
}

export const PlayStationFields: FC<PlayStationFieldsProps> = ({ className, pcType, onHide }) => {
	const [playStation, setPlayStation] = useState<PlayStationTypes>({
		name: "",
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPlayStation(prevState => ({
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
		setPlayStation(prev => ({
			...prev,
			images: imagesArray
		}))
	};


	const handleBrandSelect = (brand: string) => {
		setPlayStation(prev => ({
			...prev,
			brand
		}))
		setSelectedBrand(brand)
	};

	const handleSpecificationChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
		const value = e.target.value;
		const updatedSpecifications = playStation.specifications.map(spec => {
			if (spec.name === name) {
				return { ...spec, value: value };
			}
			return spec;
		});

		setPlayStation(prev => ({
			...prev,
			specifications: updatedSpecifications
		}));
	};

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
					value={playStation.name}
					onChange={handleChange}
				/>
				{nameError && <div className="text-danger">{nameError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Price</FormLabel>
				<FormControl
					type="number"
					name="price"
					value={playStation.price}
					onChange={handleChange}
				/>
				{priceError && <div className="text-danger">{priceError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Model</FormLabel>
				<FormControl
					type="text"
					name="model"
					value={playStation.model}
					onChange={handleChange}
				/>
				{modelError && <div className="text-danger">{modelError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Description</FormLabel>
				<FormControl
					as="textarea"
					name="description"
					value={playStation.description}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'power supply unit')}

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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'dimensions and weight')}

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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'ports and connectors')}

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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'graphics card')}

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

			<MyButton className={styles.addedBtn} type="submit">Added device</MyButton>
		</Form>
	);
};

