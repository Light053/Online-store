import { FC, useEffect, useState } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './BasketPage.module.scss'
import { Col, Container, Row, Spinner } from "react-bootstrap"
import { useAppSelector } from "features/hooks/useAppSelector"
import { useAppDispatch } from "features/hooks/useAppDispatch"
import { fetchProductsFromBasket } from "entities/products/model/actionsCreatots"
import { getUsername } from "entities/user/model/selectors/getUsername"
import { clearBasket } from "entities/products/model/slice/ProductsSlice"
import { BasketItem } from "widgets/BasketItem/ui/BasketItem"

interface BasketPageProps {
	className?: string
}

export const BasketPage: FC<BasketPageProps> = ({ className }) => {
	const products = useAppSelector(state => state.products.productsFromBasket);
	const isLoading = useAppSelector(state => state.products.isLoading)
	const productsQuantity = useAppSelector(state => state.products.productsQuanity)
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
			{products.map(item => <BasketItem key={item.name} item={item} />)}
		</Container>
	)
}