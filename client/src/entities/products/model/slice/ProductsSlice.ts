import { PayloadAction, createAsyncThunk, createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { StateTypes } from "../types/stateType";
import { fetchSmartphones } from "../actionsCreatots";
import { SmartphonesTypes } from "../types/smartphonesType";
import { BrandTypes } from "../types/brandsType";
import { TypesType } from "../types/typesType";
import { ReviewResponse } from "app/models/response/ReviewResponse";

const initialState: StateTypes = {
	smartphones: [],
	types: [
		{ name: "Smartphone", brands: ["Apple", "Samsung", "Google", "Huawei", "Xiaomi", "OnePlus", "LG", "Sony", "Motorola"] },
		{ name: "PC", brands: ["Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "MSI"] },
		{ name: "PlayStation", brands: ["Sony"] },
		{ name: "Laptop", brands: ["Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "Microsoft", "MSI"] }
	],

	isLoading: false,
	error: '',
	selectedType: {},
	selectedBrand: {},
	reviews: []
}

export const ProductsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setSelectedType: (state: StateTypes, action: PayloadAction<TypesType>) => {
			state.selectedType = action.payload
		},
		setSelectedBrand: (state: StateTypes, action: PayloadAction<BrandTypes>) => {
			state.selectedBrand = action.payload
		},
		setReview: (state: StateTypes, action: PayloadAction<ReviewResponse[]>) => {
			state.reviews.push(...action.payload)
		},
		clearSmartphones: (state: StateTypes) => {
			state.smartphones = [];
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSmartphones.fulfilled, (state: StateTypes, action: PayloadAction<SmartphonesTypes[]>) => {
			state.isLoading = false;
			state.error = '';
			state.smartphones.push(...action.payload);
		})
			.addCase(fetchSmartphones.pending, (state: StateTypes) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(fetchSmartphones.rejected, (state: StateTypes, action) => {
				state.isLoading = false;
				state.error = action.payload.toString();
			});
	}
});
export const { setSelectedType, setSelectedBrand, clearSmartphones, setReview } = ProductsSlice.actions
export const ProductsReducer = ProductsSlice.reducer