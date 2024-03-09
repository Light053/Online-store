import React, { FC, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import { Form, FormGroup, FormLabel, FormControl, Button, Dropdown } from "react-bootstrap";
import { useAppSelector } from "features/hooks/useAppSelector";
import styles from './DesktopPCFields.module.scss';
import { MyButton } from "shared/ui/Button";
import { DesktopPCtypes } from "entities/products/model/types/PCTypes";

interface DesktopPCtypesProps {
	className?: string;
	pcType?: DesktopPCtypes;
	onHide: () => void;
}

export const DesktopPCFields: FC<DesktopPCtypesProps> = ({ className, pcType, onHide }) => {
	const [pc, setPC] = useState<DesktopPCtypes>({
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
			{ name: "case", value: '' },
			{ name: "power supply unit", value: '' },
		]
	});

	console.log(pc);

	const [selectedBrand, setSelectedBrand] = useState<string>("");
	const brands = useAppSelector(state => state.products.types);
	const pcBrands = brands[1].brands
	console.log(pcBrands);

	const [nameError, setNameError] = useState<string>("");
	const [priceError, setPriceError] = useState<string>("");
	const [modelError, setModelError] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPC(prevState => ({
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
		setPC(prev => ({
			...prev,
			images: imagesArray
		}))
	};


	const handleBrandSelect = (brand: string) => {
		setPC(prev => ({
			...prev,
			brand
		}))
		setSelectedBrand(brand)
	};

	const handleSpecificationChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
		const value = e.target.value;
		const updatedSpecifications = pc.specifications.map(spec => {
			if (spec.name === name) {
				return { ...spec, value: value };
			}
			return spec;
		});

		setPC(prev => ({
			...prev,
			specifications: updatedSpecifications
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (pc.model.trim() === "") {
			setModelError("Model is required");
			return;
		}
		if (pc.name.trim() === "") {
			setNameError("Name is required");
			return;
		}
		if (pc.price === 0) {
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
					{pcBrands.map(brand =>
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
					value={pc.name}
					onChange={handleChange}
				/>
				{nameError && <div className="text-danger">{nameError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Price</FormLabel>
				<FormControl
					type="number"
					name="price"
					value={pc.price}
					onChange={handleChange}
				/>
				{priceError && <div className="text-danger">{priceError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Model</FormLabel>
				<FormControl
					type="text"
					name="model"
					value={pc.model}
					onChange={handleChange}
				/>
				{modelError && <div className="text-danger">{modelError}</div>}
			</FormGroup>
			<FormGroup>
				<FormLabel>Description</FormLabel>
				<FormControl
					as="textarea"
					name="description"
					value={pc.description}
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
						name="operatingName"
						value="operating system"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="operatingValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'operating system')}

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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'operating system')}
					/>
				</div>
			</FormGroup>
			<FormGroup className={styles.specForm}>
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="portsAndConnectors"
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
				<div className={classNames(styles.specWrapper, {}, ['d-flex'])}>
					<FormControl
						type="text"
						name="dimensionsAndWeight"
						value="dimensions"
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
						name="case"
						value="Case"
						disabled
						className={classNames(styles.specName, {}, ['mr2'])}
					/>
					<FormControl
						type="text"
						name="caseValue"
						className={styles.specInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificationChange(e, 'case')}
					/>
				</div>
			</FormGroup>
			<MyButton className={styles.addedBtn} type="submit">Added device</MyButton>
		</Form>
	);
};

