import { FC, useEffect, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './ReviewsList.module.scss';
import { getReviews } from "shared/lib/getReviews/getReviews";
import { ReviewResponse } from "app/models/response/ReviewResponse";
import { Row, Col } from "react-bootstrap";
import { ReviewItem } from "shared/ui/ReviewItem";
import { useAppSelector } from "features/hooks/useAppSelector";
import { useAppDispatch } from "features/hooks/useAppDispatch";

interface ReviewsListProps {
	className?: string;
	productName: string
}

export const ReviewsList: FC<ReviewsListProps> = ({ className, productName }) => {
	const [reviews, setReviews] = useState<ReviewResponse[]>([]);
	const storeReview = useAppSelector(state => state.products.reviews)
	const disptach = useAppDispatch();

	useEffect(() => {
		const fetchReviews = async () => {
			const reviews = await getReviews(productName);
			setReviews(reviews);
		};

		fetchReviews();
	}, []);


	return (
		<div className={classNames(styles.ReviewsList)}>
			{reviews.map((review, index) => (
				<Row key={index} className="mb-2">
					<Col xs={12}>
						<ReviewItem review={review} />
					</Col>
				</Row>
			))}
		</div>
	);
};
