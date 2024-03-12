import { FC, useMemo } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './BrandBar.module.scss'
import { useAppSelector } from "features/hooks/useAppSelector"
import { useAppDispatch } from "features/hooks/useAppDispatch"
import { BrandTypes } from "entities/products/model/types/brandsType"
import { setSelectedBrand } from "entities/products/model/slice/ProductsSlice"
import { Card, Row } from "react-bootstrap"


interface BrandBarProps {
	className?: string
}

export const BrandBar: FC<BrandBarProps> = ({ className }) => {
	const types = useAppSelector(state => state.products.types);
	const selectedType = useAppSelector(state => state.products.selectedType)
	const dispatch = useAppDispatch();

	const allBrands = types.reduce((acc, type) => {
		return acc.concat(type.brands);
	}, []);

	const uniqueBrands = Array.from(new Set(allBrands));

	const selectedBrand = useAppSelector(state => state.products.selectedBrand);

	const selectBrand = (brand: BrandTypes) => {
		dispatch(setSelectedBrand(brand));
	}

	const deviceBrands = useMemo(() => {
		//@ts-ignore
		const selectedTypeName = selectedType.name;
		const selectedTypeBrands = types.find(type => type.name === selectedTypeName);

		return selectedTypeBrands.brands;
	}, [selectedType, types]);
	console.log(selectedBrand);

	return (
		<Row className={classNames(styles.BrandBar, {}, [className, "d-flex mt-3"])}>
			{deviceBrands.map((brand, index) =>
				<Card
					className={classNames(styles.cardItem, {}, ["p-3 mt-1"])}
					key={index}
					border={brand === selectedBrand.name ? "light" : "dark"}
					onClick={() => selectBrand({ name: brand })}
				>
					{brand}
				</Card>
			)}
		</Row>
	)
}
