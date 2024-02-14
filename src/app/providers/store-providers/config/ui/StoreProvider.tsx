import { FC, PropsWithChildren, ReactNode, useMemo } from "react"
import { Provider } from "react-redux"
import { createReduxStore } from "../store"
import { StateSchema } from "../state-schema"

interface StoreProviderProps extends PropsWithChildren {
	initialState?: StateSchema
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState }) => {

	const store = useMemo(() => createReduxStore(initialState), [initialState]);

	return (
		<Provider store={store}>
			{children}
		</Provider>
	)
}