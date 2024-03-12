import { FC, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './Reviews.module.scss';
import { Form, Row } from "react-bootstrap";
import ReactStars from "react-stars";
import { MyButton } from "shared/ui/Button";
import { addReview } from "shared/lib/addReview/addReview";
import { useAppSelector } from "features/hooks/useAppSelector";
import { useAppDispatch } from "features/hooks/useAppDispatch";
import { setReview } from "entities/products/model/slice/ProductsSlice";

interface ReviewsProps {
	className?: string;
	productName: string
}

export const Reviews: FC<ReviewsProps> = ({ className, productName }) => {

	const [reviewError, setReviewError] = useState('')
	const [reviewText, setReviewText] = useState('');

	const [rating, setRating] = useState<number>(0);
	const [errorRating, setErrorRating] = useState('')

	const user = useAppSelector(state => state.user.user)
	const disptach = useAppDispatch();

	const handleReviewTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReviewText(e.target.value);
		setReviewError('')
	};

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
	};

	const handleSubmitReview = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (reviewText.trim() === '') {
			setReviewError('Please enter a review')
		}
		else if (rating === 0) {
			setErrorRating('Please rate')
		}
		else {
			addReview(reviewText, rating, user.username, productName)
			disptach(setReview({ text: reviewText, username: user.username }))
			setReviewText('');
			setRating(0);
		}
	};

	return (
		<Row className={classNames(styles.Reviews)}>
			<Form className={styles.form}>
				<Form.Group controlId="reviewText">
					<Form.Control
						as="textarea"
						placeholder="Enter your review"
						value={reviewText}
						onChange={handleReviewTextChange}
						className={classNames(styles.form, {}, ['mt-3'])}
					/>
				</Form.Group>
				{reviewError && <div className="text-danger">{reviewError}</div>}
				<Form.Group controlId="rating">
					<ReactStars
						count={5}
						onChange={handleRatingChange}
						size={24}
						color1="black"
					/>
				</Form.Group>
				{errorRating && <div className="text-danger">{errorRating}</div>}
			</Form>
			<MyButton onClick={handleSubmitReview} className={classNames(styles.submitBtn, {}, [])}>
				Submit Review
			</MyButton>
		</Row>
	);
};
