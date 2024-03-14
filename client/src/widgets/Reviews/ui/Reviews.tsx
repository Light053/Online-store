import { FC, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './Reviews.module.scss';
import { Form, Row } from "react-bootstrap";
import ReactStars from "react-stars";
import { MyButton } from "shared/ui/Button";
import { addReview } from "shared/lib/addReview/addReview";
import { useAppSelector } from "features/hooks/useAppSelector";
import { useAppDispatch } from "features/hooks/useAppDispatch";
import { clearReviews, setReview } from "entities/products/model/slice/ProductsSlice";
import React from "react";

interface ReviewsProps {
	className?: string;
	productName: string
}

export const Reviews: FC<ReviewsProps> = ({ className, productName }) => {

	const [reviewError, setReviewError] = useState('')
	const [reviewText, setReviewText] = useState('');
	const storeReview = useAppSelector(state => state.products.reviews);
	const [rating, setRating] = useState<number>(0);
	const [errorRating, setErrorRating] = useState('')

	//@ts-ignore
	const user = useAppSelector(state => state.user.user.username.username)
	const disptach = useAppDispatch();

	const handleReviewTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReviewText(e.target.value);
		setReviewError('')
	};

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
	};

	const handleSubmitReview = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (reviewText.trim() === '') {
			setReviewError('Please enter a review');
		} else if (rating === 0) {
			setErrorRating('Please rate');
		} else {
			try {
				disptach(clearReviews())
				console.log('после чистки:', storeReview);
				console.log('user', user);

				const reviews = await addReview(reviewText, rating, user, productName);
				console.log('reviews:', reviews.data.reviews);

				//@ts-ignore
				disptach(setReview(reviews.data.reviews));
				setReviewText('');
				setRating(0);
			} catch (error) {
				console.error("Error while adding review:", error);
			}
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
