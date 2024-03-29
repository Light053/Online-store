import { FC, useEffect, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './ReviewsList.module.scss';
import { getReviews } from "shared/lib/getReviews/getReviews";
import { ReviewResponse } from "app/models/response/ReviewResponse";
import { Row, Col } from "react-bootstrap";
import { useAppSelector } from "features/hooks/useAppSelector";
import { ReviewItem } from "widgets/ReviewItem";

interface ReviewsListProps {
	className?: string;
	productName: string
}

export const ReviewsList: FC<ReviewsListProps> = ({ className, productName }) => {
	const [reviews, setReviews] = useState<ReviewResponse[]>([]);
	const storeReview = useAppSelector(state => state.products.reviews)

	useEffect(() => {
		const fetchReviews = async () => {
			const reviews = await getReviews(productName);
			setReviews(reviews);
		};

		fetchReviews();
	}, [storeReview]);

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
