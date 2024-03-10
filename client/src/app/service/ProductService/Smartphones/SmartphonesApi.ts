import { $apiProducts } from "app/http";
import { ProductResponse } from "app/models/response/ProductResponse";
import { AxiosResponse } from 'axios'

export default class SmartPhonesApi {

	static async setProduct(product: unknown): Promise<AxiosResponse<ProductResponse[]>> {
		return $apiProducts.post('setProduct', product)
	}

	static async getProducts(limit: number = 9, page: number = 1): Promise<AxiosResponse<ProductResponse[]>> {
		const url = `/products?limit=${limit}&page=${page}`;
		return $apiProducts.get<ProductResponse[]>(url);
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
}
