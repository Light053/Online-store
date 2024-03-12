import ProductApi from "app/service/ProductService/ProductApi"

export const setItemBasket = (productName: string, username: string, countItems: number) => {
	const response = ProductApi.setItemBasket(productName, username, countItems);

	return response
}