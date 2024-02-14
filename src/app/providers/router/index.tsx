import { Route, Routes } from 'react-router-dom';
import { FC, Suspense } from "react";
import { routerConfig } from 'shared/config/route-config/route-config';


export const AppRouter: FC = () => {
	return (
		<Suspense fallback={<div>LOADING....</div>}>
			<Routes>
				{Object.values(routerConfig).map(({ element, path }) =>
					<Route
						key={path}
						element={
							<div className='page-wrapper'>
								{element}
							</div>
						}
						path={path}
					/>
				)}
			</Routes>
		</Suspense>
	)
}