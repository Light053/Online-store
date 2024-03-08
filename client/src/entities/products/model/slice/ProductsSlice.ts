import { PayloadAction, createAsyncThunk, createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { StateTypes } from "../types/stateType";
import { fetchSmartphones } from "../actionsCreatots";
import { SmartphonesTypes } from "../types/smartphonesType";
import { BrandTypes } from "../types/brandsType";
import { TypesType } from "../types/typesType";

const initialState: StateTypes = {
	smartphones: [],
	brands: [{ name: "Samsung" }, { name: "Apple" }, { name: "One Pluse" }, { name: "Google Pixel" }],
	types: [{ name: "Smartphone" }, { name: "PC" }, { name: "PlayStation" }, { name: "Laptop" }],
	isLoading: false,
	error: '',
	selectedType: {},
	selectedBrand: {}
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
export const { setSelectedType, setSelectedBrand, clearSmartphones } = ProductsSlice.actions
export const ProductsReducer = ProductsSlice.reducer