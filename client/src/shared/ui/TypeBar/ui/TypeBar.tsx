import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './TypeBar.module.scss'
import { ListGroup } from "react-bootstrap"
import { useAppSelector } from "features/hooks/useAppSelector"
import { useAppDispatch } from "features/hooks/useAppDispatch"
import { setSelectedType } from "entities/products/model/slice/ProductsSlice"

interface TypeBarProps {
	className?: string
}

export const TypeBar: FC<TypeBarProps> = ({ className }) => {

	const types = useAppSelector(state => state.products.types)
	const selectedType = useAppSelector(state => state.products.selectedType);
	const dispatch = useAppDispatch();

	const selectType = (type: string) => {
		dispatch(setSelectedType(type))
	}

	return (
		<div className={classNames(styles.TypeBar, {}, [])}>
			<ListGroup >
				{types.map((type, index) =>
					<ListGroup.Item
						className={styles.listItem}
						key={index}
						action
						variant="light"
						active={type.name === selectedType.name}
						onClick={() => selectType(type.name)}
					>
						{type.name}
					</ListGroup.Item>
				)}
			</ListGroup>
		</div>
	)
}