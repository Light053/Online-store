import { FC, useEffect, useState } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './BasketPage.module.scss'
import { Container, Spinner } from "react-bootstrap"
import { useAppSelector } from "features/hooks/useAppSelector"
import { useAppDispatch } from "features/hooks/useAppDispatch"
import { fetchProductsFromBasket } from "entities/products/model/actionsCreatots"
import { getUsername } from "entities/user/model/selectors/getUsername"
import { BasketItem } from "widgets/BasketItem/ui/BasketItem"
import { EmptyCart } from "widgets/EmpyCart/EmptyCart"

interface BasketPageProps {
	className?: string
}

export const BasketPage: FC<BasketPageProps> = ({ className }) => {
	const products = useAppSelector(state => state.products.productsFromBasket);
	const isLoading = useAppSelector(state => state.products.isLoading)
	const dispatch = useAppDispatch()
	const username = useAppSelector(state => getUsername(state));

	useEffect(() => {
		async function fetchProducts() {
			dispatch(fetchProductsFromBasket({ username }));
		}
		fetchProducts()
	}, [])

	if (isLoading) {
		return <div className={styles.spiner}><Spinner /></div>
	}

	return (
		<Container className={classNames(styles.BasketPage, {}, [])}>
			{products.length === 0 ? (
				<EmptyCart />
			)
				:
				products.map(item => <BasketItem key={item.name} item={item} />)}
		</Container>
	)
}