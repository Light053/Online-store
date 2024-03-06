import { FC, useEffect, useState } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './DeviceInfoPage.module.scss';
import { useParams } from "react-router";
import { Button, Col, Row, Image, Container } from "react-bootstrap";
import { productName } from "shared/lib/productName/productName";
import { getProduct } from "shared/lib/getProduct/gerProduct";
import { SmartphonesTypes } from "entities/products/model/types/smartphonesType";
import BigStar from 'shared/assets/bigStar.png'

interface DeviceInfoProps {
	className?: string,
}

export const DeviceInfoPage: FC<DeviceInfoProps> = ({ className }) => {
	const { name } = useParams();
	const pName = productName(name);
	const [device, setDevice] = useState<SmartphonesTypes>()

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

	return (
		<div className={classNames(styles.DeviceInfo, {}, [className])}>
			{device && (
				<>
					<Container className={styles.row1}>
						<Row>
							<Col md={4}>
								<Image src={device.images[0]} alt={device.name} fluid className={styles.img} />
							</Col>
							<Col className={styles.rating}>
								<div>
									<p className="d-flex align-items-center justify-content-center "
										style={{ background: `url(${BigStar}) no-repeat center center `, width: 240, height: 240, backgroundSize: 'cover' }}
									>
										{device.rating}
									</p>
								</div>

							</Col>
							<Col md={4}>
								<h2>{device.name}</h2>
								<p><strong>Brand:</strong> {device.brand}</p>
								<p><strong>Model:</strong> {device.model}</p>
								<p><strong>Description:</strong> {device.description}</p>
								<p><strong>Price:</strong> ${device.price}</p>
								<Button className={styles.btn} variant="outline-success">Add to Cart</Button>
							</Col>
						</Row>
					</Container>

					<Container className={styles.row2}>
						<Row>
							<Col className="mt-2">
								<h3 >Specifications:</h3>
								<ul>
									{device.specifications.map((spec, index) => (
										<li
											className={styles.spec}
											key={spec.name}
											style={index % 2 === 0 ? { backgroundColor: "rgb(70, 70, 70)" } : { backgroundColor: "black" }}>
											<strong>{spec.name}:</strong> {spec.value}
										</li>
									))}
								</ul>
							</Col>
						</Row>
					</Container>
				</>
			)}
		</div>
	);

};
