import React, { FC } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './BasketItem.module.scss';
import { ProductResponse } from "app/models/response/ProductResponse";
import { Row, Col, Image, Button, Card } from "react-bootstrap";
import { MyButton } from "shared/ui/Button";
import { useAppDispatch } from "features/hooks/useAppDispatch";
import { setItemBasket } from "shared/lib/setItemBasket/setItemBasket";
import { setProductsQuantity } from "entities/products/model/slice/ProductsSlice";

interface BasketItemProps {
	className?: string;
	item: ProductResponse;
}

export const BasketItem: FC<BasketItemProps> = ({ className, item }) => {
	const image = item.images[0];
	const dispatch = useAppDispatch()


	const handleQuantityProducts = (productName: string, username: string, count: number) => {
		setItemBasket(productName, username, count);
		dispatch(setProductsQuantity({
			name: productName,
			quantity: count
		}))
	}

	return (
		<Card className={classNames(styles.Card, {}, ["mt-3"])}>
			<Row className={classNames(styles.BasketItem)}>
				<Col xs={3}>
					<Image src={image} alt={item.name} fluid />
				</Col>
				<Col xs={6} className="mt-3">
					<h4>{item.name}</h4>
					<p>{item.description}</p>
					<Row>
						<MyButton className={styles.removeBtn}>Remove all from basket</MyButton>
						<MyButton className={styles.removeBtn}>Remove 1 from basket</MyButton>
						<MyButton onClick={() => handleQuantityProducts(item.name, 'Light', 1)} className={styles.removeBtn}>Add 1 product</MyButton>
					</Row>
				</Col>
				<Col xs={3} className="text-right">
					<p className={styles.price}>${item.price}</p>
				</Col>
			</Row>
		</Card>
	);
};
