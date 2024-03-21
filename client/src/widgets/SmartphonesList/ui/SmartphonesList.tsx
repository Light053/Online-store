import { FC, useCallback, useEffect, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './SmartphonesList.module.scss';
import { useAppSelector } from "features/hooks/useAppSelector";
import { useAppDispatch } from "features/hooks/useAppDispatch";
import { fetchProducts, fetchProductsFromBasket } from "entities/products/model/actionsCreatots";
import { Row, Spinner, Col } from "react-bootstrap";
import { DeviceItem } from "widgets/DeviceItem/ui/DeviceItem";
import { clearSmartphones, setTotalCount } from "entities/products/model/slice/ProductsSlice";
import React from "react";

interface SmartphonesListProps {
	className?: string;
}

export const SmartphonesList: FC<SmartphonesListProps> = React.memo(({ className }) => {
	const { smartphones, isLoading, page, limit, selectedType, selectedBrand } = useAppSelector(state => state.products);
	const { name: type } = selectedType;
	const { name: brand } = selectedBrand;
	const dispatch = useAppDispatch();

	const fetchApi = useCallback(async () => {
		dispatch(clearSmartphones());
		dispatch(fetchProducts({ type, brand }));
	}, [dispatch, type, brand]);

	useEffect(() => {
		fetchApi();
	}, [fetchApi]);

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
				{smartphones.length === 0 && <div className={styles.notFound}>No products found!</div>}
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
});
