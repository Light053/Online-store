import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import ProductApi from "app/service/ProductService/ProductApi";
import { StateTypes } from "./types/stateType";
import { SmartphonesTypes } from "./types/smartphonesType";

interface FetchSmartphonesArgs {
	page?: number;
	limit?: number;
	type?: string,
	brand?: string,
}

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async ({ page, limit, type, brand }: FetchSmartphonesArgs) => {
		try {
			const response = await ProductApi.getProducts(limit = 9, page = 1, type, brand);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const fetchProductsFromBasket = createAsyncThunk(
	'products/fetchProductsFromBasket',
	async ({ username }: { username: string }) => {
		try {
			const response = await ProductApi.getProductsFromBasket(username)
			console.log(response.data);

			return response.data;
		} catch (error) {
			throw error;
		}
	}
)