import { PayloadAction, createAsyncThunk, createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { StateTypes } from "../types/stateType";
import { fetchSmartphones } from "../actionsCreatots";
import { SmartphonesTypes } from "../types/smartphonesType";
import { BrandTypes } from "../types/brandsType";

const initialState: StateTypes = {
	smartphones: [],
	brands: [{ name: "Samsung" }, { name: "Apple" }, { name: "One Pluse" }],
	types: [{ name: "Smartphones" }, { name: "PC" }, { name: "PlayStations" }, { name: "Laptopes" }],
	isLoading: false,
	error: '',
	selectedType: {}
}

export const ProductsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setSelectedType: (state: StateTypes, action: PayloadAction<BrandTypes>) => {
			state.selectedType = action.payload
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
export const { setSelectedType } = ProductsSlice.actions
export const ProductsReducer = ProductsSlice.reducer