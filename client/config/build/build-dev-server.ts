import { BuildOptions } from "./types/types";
import type { Configuration as DevServerConfiguratuin } from 'webpack-dev-server'

export default function BuildDevServer(options: BuildOptions): DevServerConfiguratuin {
	return {
		port: options.port,
		open: true,
		historyApiFallback: true,
		hot: true
	}
}