import ProductApi from "app/service/ProductService/ProductApi"

export const getReviews = async (name: string) => {
	const reviews = await ProductApi.getReviews(name)
	console.log(reviews);

	return reviews.data
}