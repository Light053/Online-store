import ProductApi from "app/service/ProductService/ProductApi";


export const setProdct = (product: unknown) => {
	const req = ProductApi.setProduct(product);
	console.log(req);

}