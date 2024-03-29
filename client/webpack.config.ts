import webpack from "webpack";
import { buildWebpackConfig } from "./config/build/build-webpack-config";
import { BuildPaths } from "./config/build/types/types";
import { BuildEnv } from "./config/build/types/types";
import path from "path";

export default (env: BuildEnv) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
	};

	const mode = env.mode || 'development';
	const PORT = env.port || 5000;

	const isDev = mode === 'development';

	const config: webpack.Configuration = buildWebpackConfig({
		mode,
		paths,
		isDev,
		port: PORT,
	});

	return config;
};
