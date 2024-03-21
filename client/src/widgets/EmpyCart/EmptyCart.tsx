import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './EmptyCart.module.scss'
import Basket from 'shared/assets/Basket.svg'

interface EmptyCartProps {
	className?: string
}

export const EmptyCart: FC<EmptyCartProps> = ({ className }) => {

	return (
		<div className={classNames(styles.emptyBasket, {}, [])}>
			<div className={styles.notFound}>Cart is empty!</div>
			<Basket className={styles.cart} />
		</div>
	)
}