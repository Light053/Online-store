import { FC, useEffect, useState } from "react";
import "./styles/reset.scss";
import "./styles/index.scss";
import { NavBar } from "widgets/NavBar/index";
import { AppRouter } from "./providers/router";
import { checkAuth } from "entities/user/model/actionCreators";
import { useAppDispatch } from "features/hooks/useAppDispatch";
import { ChangeTheme } from "widgets/ChangeTheme/ui/ChangeTheme";

interface AppProps {
	className?: string;
}

export const App: FC<AppProps> = ({ className }) => {
	const dispatch = useAppDispatch();

	const [theme, setTheme] = useState<boolean>(() => {
		const storedTheme = localStorage.getItem("theme");
		const currentTheme = JSON.parse(storedTheme)
		return currentTheme
	});

	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(checkAuth())
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
