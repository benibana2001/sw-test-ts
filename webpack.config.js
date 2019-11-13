const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
    
    output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin(
			{
				template: './src/html/index.html',
				// chunks: ['index']
			}
		),
	],

	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'src')],
				exclude: [/node_modules/]
			},
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							url: false,
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							url: false,
							sourceMap: true
						}
					},
				]
			},
			{
				test: /\.html$/,
				include: [path.resolve(__dirname, 'src')],
				loader: "html-loader"
			},
			{
				// test: /\.(png|svg|jpg|gif)$/,
				test: /\.jpg$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					{
						loader: 'file-loader',
						options: {
							// limit: 20000,
							name: '[name].[ext]'
						}
					}
					// {
					// 	loader: 'url-loader',
					// }
				],
			},
			{
				test: /\.mp3$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}

					}
				],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				],
			  }
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: true
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};