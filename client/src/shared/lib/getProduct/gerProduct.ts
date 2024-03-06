import SmartPhonesApi from "app/service/ProductService/Smartphones/SmartphonesApi";

export async function getProduct(name: string) {
	const products = SmartPhonesApi.getProduct(name);
	return products;
}