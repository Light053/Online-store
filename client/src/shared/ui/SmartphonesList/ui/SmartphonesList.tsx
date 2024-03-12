import { FC, useEffect, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './SmartphonesList.module.scss';
import { useAppSelector } from "features/hooks/useAppSelector";
import { useAppDispatch } from "features/hooks/useAppDispatch";
import { fetchProducts, fetchProductsFromBasket } from "entities/products/model/actionsCreatots";
import { Row, Spinner, Col } from "react-bootstrap";
import { DeviceItem } from "widgets/DeviceItem/ui/DeviceItem";
import { clearSmartphones, setTotalCount } from "entities/products/model/slice/ProductsSlice";
import { setItemBasket } from "shared/lib/setItemBasket/setItemBasket";

interface SmartphonesListProps {
	className?: string;
}

export const SmartphonesList: FC<SmartphonesListProps> = ({ className }) => {
	const smartphones = useAppSelector(state => state.products.smartphones);
	const isLoading = useAppSelector(state => state.products.isLoading);
	const page = useAppSelector(state => state.products.page);
	const limit = useAppSelector(state => state.products.limit);
	const selectedType = useAppSelector(state => state.products.selectedType);
	const selectedBrands = useAppSelector(state => state.products.selectedBrand)

	const type = selectedType.name;
	const brand = selectedBrands.name
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchApi = async () => {
			dispatch(clearSmartphones());
			dispatch(fetchProducts({ type, brand })).then(result => dispatch(setTotalCount(smartphones.length)));
		};
		fetchApi()

	}, [type, brand]);

	if (isLoading) {
		return <div className={styles.spinner}><Spinner /></div>;
	}

	const renderSmartphones = () => {
		const smartphonesChunks = [];
		const chunkSize = 4;
		for (let i = 0; i < smartphones.length; i += chunkSize) {
			smartphonesChunks.push(smartphones.slice(i, i + chunkSize));
		}
		return (
			<>
				{smartphonesChunks.map((chunk, index) => (
					<Row key={index} className={classNames(styles.SmartphonesRow, {}, [])}>
						{chunk.map(s =>
							<Col key={s.name} md={3}>
								<DeviceItem device={s} />
							</Col>
						)}
					</Row>
				))}
			</>
		);
	};

	return (
		<>
			{renderSmartphones()}
		</>
	);
};
