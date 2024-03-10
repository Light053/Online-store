import { $apiProducts } from "app/http";
import { SmartphonesResponse } from "app/models/response/SmartphonesResponse";
import { AxiosResponse } from 'axios'

export default class SmartPhonesApi {

	static async setProduct(product: unknown): Promise<AxiosResponse<SmartphonesResponse[]>> {
		return $apiProducts.post('setProduct', product)
	}

	static async getProducts(limit: number = 9, page: number = 1): Promise<AxiosResponse<SmartphonesResponse[]>> {
		const url = `/products?limit=${limit}&page=${page}`;
		return $apiProducts.get<SmartphonesResponse[]>(url);
	}

	static async getProduct(name: string): Promise<AxiosResponse<SmartphonesResponse>> {
		const url = `/product`;
		const config = {
			params: {
				name
			}
		};
		return $apiProducts.get<SmartphonesResponse>(url, config);
	}
}
