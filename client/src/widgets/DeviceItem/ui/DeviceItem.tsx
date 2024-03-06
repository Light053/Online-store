import { FC } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './DeviceItem.module.scss';
import { Card, Col, Image } from "react-bootstrap";
import Star from 'shared/assets/star.svg'
import { useNavigate } from "react-router";
import { RouterPath } from "shared/config/route-config/route-config";

interface DeviceItemProps {
	className?: string;
	device: {
		name: string;
		brand?: string;
		model?: string;
		price: number;
		images?: string[];
		rating?: number;
	};
}

export const DeviceItem: FC<DeviceItemProps> = ({ className, device }) => {

	const img = device.images[0];
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate(`${RouterPath.deviceInfo}${device.name}`)
	}

	return (
		<Col className={classNames(styles.DeviceItem, {}, ["d-flex"])} onClick={handleNavigate}>
			<Card className={styles.DeviceItem}>
				<Card.Body className={styles.card}>
					<Card.Img className={styles.cardImg} src={img}></Card.Img>
					<Card.Title className={styles.cardTitle}>{device.name}</Card.Title>
					<div className={styles.rating}>
						{device.rating}
						<Star className={styles.star} />
					</div>
					{device.brand && <Card.Subtitle
						className={classNames(styles.cardSubtitle, {}, ["mb-2"])}
					>
						{device.brand}
					</Card.Subtitle>}

					{device.model && <Card.Subtitle className={classNames(styles.cardSubtitle, {}, ["mb-2"])}>
						{device.model}
					</Card.Subtitle>}

					<Card.Text className={classNames(styles.cardText)}>Price: {device.price}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};
