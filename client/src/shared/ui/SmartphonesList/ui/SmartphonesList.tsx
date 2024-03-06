import { FC, useEffect } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './SmartphonesList.module.scss'
import { useAppSelector } from "features/hooks/useAppSelector"
import { useAppDispatch } from "features/hooks/useAppDispatch"
import { fetchSmartphones } from "entities/products/model/actionsCreatots"
import { Row, Spinner } from "react-bootstrap"
import { DeviceItem } from "widgets/DeviceItem/ui/DeviceItem"
import { clearSmartphones } from "entities/products/model/slice/ProductsSlice"


interface SmartphonesListProps {
	className?: string
}

export const SmartphonesList: FC<SmartphonesListProps> = ({ className }) => {
	const smartphones = useAppSelector(state => state.products.smartphones)
	const isLoading = useAppSelector(state => state.products.isLoading)
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchApi = async () => {
			dispatch(clearSmartphones());
			dispatch(fetchSmartphones());
		}
		fetchApi();
	}, [])

	if (isLoading) {
		return <div className={styles.spinner}><Spinner /></div>
	}

	return (
		<Row className={classNames(styles.SmartphonesList, {}, [])}>
			{smartphones.map(s =>
				<DeviceItem key={s.name} device={s} />)}
		</Row>
	)
}