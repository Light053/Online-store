import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './state-schema'
import { UserReducer } from 'entities/user'
import { ProductsReducer } from 'entities/products/model/slice/ProductsSlice'

const rootReducers: ReducersMapObject<StateSchema> = {
	user: UserReducer,
	products: ProductsReducer
}
export function createReduxStore(initialState?: StateSchema) {

	return configureStore<StateSchema>({
		reducer: rootReducers,
		devTools: __IS__DEV,
		preloadedState: initialState
	})
}

export type RootState = StateSchema;
export type AppStore = ReturnType<typeof createReduxStore>
export type AppDispatch = AppStore['dispatch']