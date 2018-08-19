import {CustomWebpackBuilderConfig} from "./custom-webpack-builder-config";
import {Configuration} from "webpack";
import {getSystemPath, Path} from '@angular-devkit/core';
import {WebpackConfigMerger} from "./webpack-config-merger";

export const defaultWebpackConfigPath = 'webpack.config.js';

export class CustomWebpackBuilder {
	static buildWebpackConfig(root: Path, config: CustomWebpackBuilderConfig, baseWebpackConfig: Configuration): Configuration{
		const webpackConfigPath = config.path || defaultWebpackConfigPath;
		const customWebpackConfig = require(`${getSystemPath(root)}/${webpackConfigPath}`);
		if(typeof customWebpackConfig === "function") {
			return customWebpackConfig(baseWebpackConfig, config.mergeStrategies, config.replaceDuplicatePlugins)
		}
		return WebpackConfigMerger.merge(baseWebpackConfig, customWebpackConfig, config.mergeStrategies, config.replaceDuplicatePlugins);
	}
}