import { FC, useEffect, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './DeviceInfoPage.module.scss';
import { useParams } from "react-router";
import { Button, Col, Row, Image, Container } from "react-bootstrap";
import { productName } from "shared/lib/productName/productName";
import { getProduct } from "shared/lib/getProduct/gerProduct";
import { SmartphonesTypes } from "entities/products/model/types/smartphonesType";
import BigStar from 'shared/assets/bigStar.png'
import { Reviews } from "widgets/Reviews";
import { ReviewsList } from "widgets/ReviewsList";
import { setItemBasket } from "shared/lib/setItemBasket/setItemBasket";
import { useAppSelector } from "features/hooks/useAppSelector";
import { craeteUserBasket } from "entities/products/model/actionsCreatots";
import { useAppDispatch } from "features/hooks/useAppDispatch";

interface DeviceInfoProps {
	className?: string,
}

export const DeviceInfoPage: FC<DeviceInfoProps> = ({ className }) => {
	const { name } = useParams();
	const pName = productName(name);
	//@ts-ignore
	const username = useAppSelector(state => state.user.user.username.username)
	const [device, setDevice] = useState<SmartphonesTypes>()
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchDevice = async () => {
			try {
				const response = await getProduct(pName);
				const productData = response.data;
				setDevice(productData);
			} catch (error) {
				console.error("Error fetching device:", error);
			}
		};
		fetchDevice();
	}, []);

	const handleAddedItemInBasket = async () => {
		try {

			setItemBasket(pName, username, 1)
		} catch (error) {
			console.log(error);

		}
	}

	return (
		<div className={classNames(styles.DeviceInfo, {}, [className])}>
			{device && (
				<>

					<Container className={styles.row1}>
						<Row className={styles.headerBlock}>
							<Col xs={12} md={4} className="order-md-0">
								<Image src={device.images[0]} alt={device.name} fluid className={styles.img} />
							</Col>
							<Col xs={12} md={4} className={`text-center ${styles.rating}`}>
								<div>
									<p className="d-flex align-items-center justify-content-center "
										style={{ background: `url(${BigStar}) no-repeat center center `, width: 240, height: 240, backgroundSize: 'cover' }}>
										{device.rating}
									</p>
								</div>
							</Col>
							<Col xs={12} md={4} className="order-md-2">
								<div className={styles.specCol}>
									<h2>{device.name}</h2>
									<p><strong>Brand:</strong> {device.brand}</p>
									<p><strong>Model:</strong> {device.model}</p>
									<p><strong>Description:</strong> {device.description}</p>
									<p><strong>Price:</strong> ${device.price}</p>
									<Button className={styles.btn} onClick={handleAddedItemInBasket} variant="outline-success">Add to Cart</Button>
								</div>
							</Col>
						</Row>
					</Container>

					<Container className={styles.row2}>
						<Row>
							<Col className="mt-2">
								<h3 className={styles.specTitle}>Specifications:</h3>
								<ul>
									{device.specifications.map((spec, index) => (
										<li
											className={styles.spec}
											key={spec.name}
											style={index % 2 === 0 ? { backgroundColor: "rgb(70, 70, 70)" } : { backgroundColor: "black" }}>
											<strong className={styles.spec}>{spec.name}:</strong> {spec.value}
										</li>
									))}
								</ul>
							</Col>
						</Row>
					</Container>
					<Container>
						<div className={styles.reviews}>Reviews</div>
						<ReviewsList productName={pName} />
					</Container>
					<Container>
						<Reviews productName={pName} />
					</Container>
				</>
			)}
		</div>
	);

};
