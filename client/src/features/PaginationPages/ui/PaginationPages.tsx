import { FC } from "react"
import { classNames } from "shared/lib/class-names/class-names"
import styles from './PaginationPages.module.scss'
import Pagination from 'react-bootstrap/Pagination'
import { useAppSelector } from "features/hooks/useAppSelector"
import { useAppDispatch } from "features/hooks/useAppDispatch"
import { setPage } from "entities/products/model/slice/ProductsSlice"

interface PaginationProps {
	className?: string
}

export const PaginationPages: FC<PaginationProps> = ({ className }) => {
	const productsCount = useAppSelector(state => state.products.totalCount)
	const limit = useAppSelector(state => state.products.limit)
	const storePage = useAppSelector(state => state.products.page)
	const dispatch = useAppDispatch();

	const totalCount = Math.ceil(productsCount / limit);

	const pages = [];
	for (let i = 0; i < totalCount; i++) {
		pages.push(i + 1);
	}

	return (
		<Pagination className={classNames(styles.PaginationPages, {}, [className, 'mt-5'])}>
			{pages.map(page =>
				<Pagination.Item
					key={page}
					active={page === storePage}
					onClick={() => dispatch(setPage(page))}
				>{page}</Pagination.Item>
			)}
		</Pagination>
	)
}