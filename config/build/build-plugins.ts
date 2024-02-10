import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { ProgressPlugin } from "webpack";
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { BuildOptions } from "./types/types";


export default function buildPlugins({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {

	const plugins = [
		new HtmlWebpackPlugin({
			template: paths.html,
			title: isDev ? 'Hot Module Replacement' : '',
		}),
		new ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
		new webpack.DefinePlugin({
			__IS__DEV: JSON.stringify(isDev)
		}),
		...(isDev ? [new ReactRefreshWebpackPlugin()] : []),

	];
	if (isDev) {
		plugins.push(new BundleAnalyzerPlugin())
	}

	return plugins
}
