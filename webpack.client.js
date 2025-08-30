import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
	const isProduction = argv.mode === 'production';

	const CLIENT_PORT = process.env.CLIENT_PORT || 3001;
	const SERVER_PORT = process.env.SERVER_PORT || 3000;
	const SERVER_HOST = process.env.SERVER_HOST || 'localhost';

	return {
		name: 'client',
		target: 'web',
		entry: './src/client/index.tsx',

		output: {
			path: path.resolve(__dirname, 'dist/client'),
			filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
			publicPath: '/',
			clean: true,
		},

		resolve: {
			extensions: ['.tsx', '.ts', '.jsx', '.js'],
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		},

		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', { targets: 'last 2 versions' }],
								['@babel/preset-react', { runtime: 'automatic' }],
								'@babel/preset-typescript',
							],
							plugins: ['@emotion/babel-plugin'],
							cacheDirectory: true,
						},
					},
				},
			],
		},

		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
				inject: true,
			}),
		],

		devServer: {
			static: path.join(__dirname, 'public'),
			port: CLIENT_PORT,
			hot: true,
			historyApiFallback: true,
			proxy: [
				{
					context: ['/api'],
					target: `http://${SERVER_HOST}:${SERVER_PORT}`,
					changeOrigin: true,
				},
			],
		},

		devtool: isProduction ? 'source-map' : 'eval-source-map',

		optimization: {
			splitChunks: isProduction
				? {
						chunks: 'all',
						cacheGroups: {
							vendor: {
								test: /[\\/]node_modules[\\/]/,
								name: 'vendors',
								chunks: 'all',
							},
						},
					}
				: false,
		},
	};
};
