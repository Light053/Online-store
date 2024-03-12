import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateTypes } from "../types/stateType";
import { fetchProducts, fetchProductsFromBasket } from "../actionsCreatots";
import { SmartphonesTypes } from "../types/smartphonesType";
import { BrandTypes } from "../types/brandsType";
import { ReviewType } from "../types/reviewType";
import { productsQuanityType } from "../types/productsQuanityType";

const initialState: StateTypes = {
	smartphones: [],
	productsFromBasket: [],
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
	formSelectedType: '',
	productsQuanity: []
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
		clearBasket: (state: StateTypes) => {
			state.productsFromBasket = [];
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
		},
		setProductsQuantity: (state: StateTypes, action: PayloadAction<productsQuanityType>) => {
			const { name, quantity } = action.payload;
			const productToUpdate = state.productsQuanity.find(product => product.name === name);
			if (productToUpdate) {
				productToUpdate.quantity += quantity;
			} else {
				state.productsQuanity.push({ name, quantity });
			}
		}

	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.fulfilled, (state: StateTypes, action: PayloadAction<SmartphonesTypes[]>) => {
			state.isLoading = false;
			state.error = '';
			state.smartphones.push(...action.payload);
		})
			.addCase(fetchProducts.pending, (state: StateTypes) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(fetchProducts.rejected, (state: StateTypes, action) => {
				state.isLoading = false;
				state.error = action.payload.toString();
			});
		builder.addCase(fetchProductsFromBasket.fulfilled, (state: StateTypes, action: PayloadAction<SmartphonesTypes[]>) => {
			state.error = '';
			state.isLoading = false;
			state.productsFromBasket = action.payload;
		})
			.addCase(fetchProductsFromBasket.pending, (state: StateTypes) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(fetchProductsFromBasket.rejected, (state: StateTypes, action) => {
				state.isLoading = false;
				state.error = action.payload.toString();
			});
	}
});
export const {
	setSelectedType, setSelectedBrand, clearSmartphones, setReview, setPage, setTotalCount, setFormSelectedType, clearBasket, setProductsQuantity
} = ProductsSlice.actions
export const ProductsReducer = ProductsSlice.reducer