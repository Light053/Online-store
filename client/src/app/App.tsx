import { FC, useEffect, useState } from "react";
import "./styles/reset.scss";
import "./styles/index.scss";
import { NavBar } from "widgets/NavBar/index";
import { AppRouter } from "./providers/router";
import { checkAuth } from "entities/user/model/actionCreators";
import { useAppDispatch } from "features/hooks/useAppDispatch";
import { ChangeTheme } from "widgets/ChangeTheme/ui/ChangeTheme";
import { craeteUserBasket } from "entities/products/model/actionsCreatots";
import { useAppSelector } from "features/hooks/useAppSelector";
import { getUsername } from "entities/user/model/selectors/getUsername";

interface AppProps {
	className?: string;
}

export const App: FC<AppProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	//@ts-ignore
	const username = useAppSelector(state => state.user.user.username?.username)


	const [theme, setTheme] = useState<boolean>(() => {
		const storedTheme = localStorage.getItem("theme");
		const currentTheme = JSON.parse(storedTheme)
		return currentTheme
	});

	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(checkAuth())
		}
		else if (!localStorage.getItem('basket')) {
			console.log(username);
			dispatch(craeteUserBasket({ username }))

		}
	}, []);


	const handleTheme = () => {
		setTheme((prev: boolean) => {
			const newThemeValue = !prev;
			localStorage.setItem("theme", JSON.stringify(newThemeValue));
			return newThemeValue;
		});
	};

	return (
		<div className={`App ${theme ? 'light' : 'dark'}`}>
			<NavBar />
			<div className="content-page">
				<AppRouter />
				<ChangeTheme handleTheme={handleTheme} />
			</div>
		</div>
	);
};
