import React, { FC, useEffect, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './BasketItem.module.scss';
import { ProductResponse } from "app/models/response/ProductResponse";
import { Row, Col, Image, Button, Card } from "react-bootstrap";
import { MyButton } from "shared/ui/Button";
import { useAppDispatch } from "features/hooks/useAppDispatch";
import { setItemBasket } from "shared/lib/setItemBasket/setItemBasket";
import { setProductsQuantity } from "entities/products/model/slice/ProductsSlice";
import { useAppSelector } from "features/hooks/useAppSelector";
import { getUsername } from "entities/user/model/selectors/getUsername";
import { EmptyCart } from "widgets/EmpyCart/EmptyCart";

interface BasketItemProps {
	className?: string;
	item: ProductResponse;
}

export const BasketItem: FC<BasketItemProps> = React.memo(({ className, item }) => {
	const image = item.images[0];
	const dispatch = useAppDispatch()
	const username = useAppSelector(state => getUsername(state));
	const [quantity, setQuantity] = useState(item.quantity)

	const handleRemoveAll = async () => {
		try {
			await setItemBasket(item.name, username, -9999);
			dispatch(setProductsQuantity({
				name: item.name,
				quantity: 0
			}));
			setQuantity(0)
		} catch (error) {
			console.error("Ошибка при удалении продуктов из корзины:", error);
		}
	};

	const handleRemoveOne = async () => {
		try {
			await setItemBasket(item.name, username, -1);
			dispatch(setProductsQuantity({
				name: item.name,
				quantity: item.quantity - 1
			}));
			setQuantity(prev => prev -= 1)

		} catch (error) {
			console.error("Ошибка при удалении одного продукта из корзины:", error);
		}
	};

	const handleAddOne = async () => {
		try {
			await setItemBasket(item.name, username, 1);
			dispatch(setProductsQuantity({
				name: item.name,
				quantity: item.quantity + 1
			}));
			setQuantity(prev => prev += 1)
		} catch (error) {
			console.error("Ошибка при добавлении одного продукта в корзину:", error);
		}
	};

	if (quantity <= 0) {
		item = null;
		return
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
						<MyButton onClick={handleRemoveAll} className={styles.removeBtn}>Remove all from basket</MyButton>
						<MyButton
							onClick={handleRemoveOne}
							className={styles.removeBtn}>Remove 1 from basket
						</MyButton>
						<MyButton
							onClick={handleAddOne}
							className={styles.removeBtn}>Add 1 product
						</MyButton>
					</Row>
				</Col>
				<Col xs={3} className="text-right">
					<p className={styles.price}>${item.price * quantity}</p>
					<p className={styles.price}>Count: {quantity}</p>
				</Col>
			</Row>
		</Card>
	)
}, (prevProps, nextProps) => {
	return prevProps.item === nextProps.item;
});
