import { createAsyncThunk } from "@reduxjs/toolkit"
import SmartPhonesApi from "app/service/ProductService/Smartphones/SmartphonesApi"

export const fetchSmartphones = createAsyncThunk(
	'products/fetchSmartphones',
	async (_) => {
		try {
			const response = await SmartPhonesApi.getProducts();
			return response.data;
		} catch (error) {
			throw error
		}

	}
)