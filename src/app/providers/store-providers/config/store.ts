import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './state-schema'
import { UserReducer } from 'entities/user'


export function createReduxStore(initialState?: StateSchema) {

	const rootReducers: ReducersMapObject<StateSchema> = {
		user: UserReducer
	}

	return configureStore<StateSchema>({
		reducer: rootReducers,
		devTools: __IS__DEV,
		preloadedState: initialState
	})
}
