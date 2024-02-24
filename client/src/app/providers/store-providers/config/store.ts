import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './state-schema'
import { UserReducer } from 'entities/user'

const rootReducers: ReducersMapObject<StateSchema> = {
	user: UserReducer
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