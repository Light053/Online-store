import ProductApi from "app/service/ProductService/ProductApi";

export const addReview = async (reviewText: string, rating: number, username: string, productName: string) => {
	try {
		const response = await ProductApi.addReview(reviewText, username, productName, rating);
		return response.data
	} catch (error) {
		console.log(error);
	}
}