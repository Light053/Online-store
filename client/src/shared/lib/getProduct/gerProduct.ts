import ProductApi from "app/service/ProductService/ProductApi";

export async function getProduct(name: string) {
	const products = ProductApi.getProduct(name);
	return products;
}