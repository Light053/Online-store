import { $apiProducts } from "app/http";
import { ProductResponse } from "app/models/response/ProductResponse";
import { ReviewResponse } from "app/models/response/ReviewResponse";
import { AxiosResponse } from 'axios'

export default class ProductApi {

	static async setProduct(product: unknown): Promise<AxiosResponse<ProductResponse[]>> {
		return $apiProducts.post('setProduct', product)
	}

	static async getProducts(limit: number = 9, page: number = 1): Promise<AxiosResponse<ProductResponse[]>> {
		const url = `/products?limit=${limit}&page=${page}`;
		return $apiProducts.get<ProductResponse[]>(url);
	}

	static async addReview(reviewText: string, username: string, productName: string, rating: number): Promise<AxiosResponse<ProductResponse>> {
		const url = `/addReview`;
		const config = {
			productName,
			username,
			review: reviewText,
			rating
		}
		console.log('url', url);

		return $apiProducts.post<ProductResponse>(url, config)
	}

	static async getProduct(name: string): Promise<AxiosResponse<ProductResponse>> {
		const url = `/product`;
		const config = {
			params: {
				name
			}
		};
		return $apiProducts.get<ProductResponse>(url, config);
	}

	static async getReviews(name: string): Promise<AxiosResponse<ReviewResponse[]>> {
		const url = '/reviews';
		const config = {
			params: {
				name
			}
		};
		return $apiProducts.get<ReviewResponse[]>(url, config)
	}
}
