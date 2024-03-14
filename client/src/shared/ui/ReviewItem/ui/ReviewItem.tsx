import { FC, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './ReviewItem.module.scss';
import { ReviewResponse } from "app/models/response/ReviewResponse";
import { Card } from "react-bootstrap";
import moment from "moment";
import { useAppSelector } from "features/hooks/useAppSelector";
import { addReview } from "shared/lib/addReview/addReview";
import { MyButton } from "shared/ui/Button";

interface ReviewItemProps {
	className?: string;
	review: ReviewResponse;
}

export const ReviewItem: FC<ReviewItemProps> = ({ className, review }) => {
	const formattedDate = moment(review.createdAt).format('YYYY-MM-DD');
	const storeReview = useAppSelector(state => state.products.reviews)
	const [reviews, setReviews] = useState(review)



	return (
		<Card className={classNames(styles.ReviewItem)}>
			<Card.Body>
				<div className={styles.nameAndStyles}>
					<Card.Title>{review.username}</Card.Title>
					<Card.Subtitle className={styles.date}>{formattedDate}</Card.Subtitle>
				</div>
				<Card.Text>{review.text}</Card.Text>
				<Card.Text>Rating: {review.rating}</Card.Text>
			</Card.Body>
		</Card>
	);
};
