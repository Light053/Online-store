import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductApi from "app/service/ProductService/ProductApi";

interface FetchSmartphonesArgs {
	page?: number;
	limit?: number;
	type?: string,
	brand?: string,
}

export const fetchSmartphones = createAsyncThunk(
	'products/fetchSmartphones',
	async ({ page, limit, type, brand }: FetchSmartphonesArgs) => {
		try {
			const response = await ProductApi.getProducts(limit, page, type, brand);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);
