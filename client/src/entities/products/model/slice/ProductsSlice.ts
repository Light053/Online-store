import { PayloadAction, createAsyncThunk, createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { StateTypes } from "../types/stateType";
import { fetchSmartphones } from "../actionsCreatots";
import { SmartphonesTypes } from "../types/smartphonesType";
import { BrandTypes } from "../types/brandsType";
import { TypesType } from "../types/typesType";
import { ReviewResponse } from "app/models/response/ReviewResponse";
import { ReviewType } from "../types/reviewType";

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
	selectedType: { name: "Smartphone", brands: "" },
	selectedBrand: { name: "" },
	reviews: { text: "", username: "" },
	page: 1,
	limit: 3,
	totalCount: 0,
	formSelectedType: ''
}

export const ProductsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setSelectedType: (state: StateTypes, action) => {
			state.selectedType.name = action.payload;
			state.selectedBrand = { name: '' };
		},
		setSelectedBrand: (state: StateTypes, action: PayloadAction<BrandTypes>) => {
			state.selectedBrand = action.payload
		},
		setReview: (state: StateTypes, action: PayloadAction<ReviewType>) => {
			state.reviews = action.payload
		},
		clearSmartphones: (state: StateTypes) => {
			state.smartphones = [];
		},
		setPage: (state: StateTypes, action) => {
			state.page = action.payload;
		},
		setTotalCount: (state: StateTypes, action) => {
			state.totalCount = action.payload;
			console.log(state.totalCount);
		},
		setFormSelectedType: (state: StateTypes, action) => {
			state.formSelectedType = action.payload
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
export const { setSelectedType, setSelectedBrand, clearSmartphones, setReview, setPage, setTotalCount, setFormSelectedType } = ProductsSlice.actions
export const ProductsReducer = ProductsSlice.reducer