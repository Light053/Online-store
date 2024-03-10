import SmartPhonesApi from "app/service/ProductService/Smartphones/SmartphonesApi"

export const setProdct = (product: unknown) => {
	const req = SmartPhonesApi.setProduct(product);
	console.log(req);

}